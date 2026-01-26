import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// @ts-ignore - esm.sh import
import nodemailer from "https://esm.sh/nodemailer@6.9.10";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  content: string;
  recipientName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, content, recipientName }: EmailRequest = await req.json();

    if (!to || !subject || !content) {
      throw new Error("Missing required fields: to, subject, content");
    }

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailPassword) {
      throw new Error("Gmail credentials not configured");
    }

    // Replace placeholders in content
    let personalizedContent = content;
    if (recipientName) {
      personalizedContent = personalizedContent.replace(/\{\{name\}\}/g, recipientName);
    }
    personalizedContent = personalizedContent.replace(/\{\{email\}\}/g, to);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    const info = await transporter.sendMail({
      from: gmailUser,
      to: to,
      subject: subject,
      text: personalizedContent,
      html: personalizedContent.replace(/\n/g, "<br>"),
    });

    console.log(`Email sent successfully to ${to}:`, info.messageId);

    return new Response(
      JSON.stringify({ success: true, message: `Email sent to ${to}`, messageId: info.messageId }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
