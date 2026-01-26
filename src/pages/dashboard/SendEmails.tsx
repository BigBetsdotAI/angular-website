import { useState } from "react";
import { motion } from "framer-motion";
import { Send as SendIcon, Mail, Users, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { useEmail } from "@/contexts/EmailContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

export default function SendEmails() {
  const { subject, content, recipients, clearAll } = useEmail();
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const isReady = subject.trim() && content.trim() && recipients.length > 0;

  const sendEmails = async () => {
    setSending(true);
    setProgress(0);
    setSentCount(0);
    setFailedCount(0);
    setCompleted(false);

    let sent = 0;
    let failed = 0;

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      
      try {
        const { data, error } = await supabase.functions.invoke("send-email", {
          body: {
            to: recipient.email,
            subject,
            content,
            recipientName: recipient.name || "",
          },
        });

        if (error || !data?.success) {
          throw new Error(error?.message || data?.error || "Failed to send");
        }

        sent++;
        setSentCount(sent);
      } catch (error) {
        console.error(`Failed to send to ${recipient.email}:`, error);
        failed++;
        setFailedCount(failed);
      }

      setProgress(((i + 1) / recipients.length) * 100);
    }

    // Save campaign to database
    await supabase.from("campaigns").insert({
      user_id: user?.id,
      subject,
      content,
      total_emails: recipients.length,
      sent_count: sent,
      failed_count: failed,
      status: "completed",
      completed_at: new Date().toISOString(),
    });

    setSending(false);
    setCompleted(true);
    toast.success(`Campaign completed! ${sent} emails sent successfully.`);
  };

  const handleReset = () => {
    clearAll();
    setProgress(0);
    setSentCount(0);
    setFailedCount(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
            <SendIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          Send Emails
        </h1>
        <p className="text-muted-foreground mt-2">
          Review your campaign and start sending
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-medium text-foreground truncate max-w-[180px]">
                    {subject || "Not set"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recipients</p>
                  <p className="font-medium text-foreground">
                    {recipients.length} emails
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                  isReady ? "bg-success/10" : "bg-warning/10"
                }`}>
                  {isReady ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-warning" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-foreground">
                    {isReady ? "Ready to send" : "Incomplete"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Campaign Progress</CardTitle>
            <CardDescription>
              {sending
                ? "Sending emails..."
                : completed
                ? "Campaign completed"
                : "Click send to start your campaign"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isReady && !sending && !completed && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Cannot send emails</AlertTitle>
                <AlertDescription>
                  Please complete the following:
                  <ul className="mt-2 list-disc list-inside text-sm">
                    {!subject.trim() && <li>Add a subject line</li>}
                    {!content.trim() && <li>Compose your message</li>}
                    {recipients.length === 0 && <li>Upload recipient list</li>}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {(sending || completed) && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-2xl font-bold text-success">{sentCount}</p>
                        <p className="text-sm text-muted-foreground">Sent</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="text-2xl font-bold text-destructive">{failedCount}</p>
                        <p className="text-sm text-muted-foreground">Failed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {!completed ? (
                <Button
                  className="flex-1 gradient-primary text-primary-foreground shadow-glow"
                  size="lg"
                  disabled={!isReady || sending}
                  onClick={sendEmails}
                >
                  {sending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon className="mr-2 h-5 w-5" />
                      Send Emails
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  className="flex-1"
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                >
                  Start New Campaign
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
