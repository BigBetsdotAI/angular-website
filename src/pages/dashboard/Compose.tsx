import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Eye, Save, FileText } from "lucide-react";
import { useEmail } from "@/contexts/EmailContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const placeholders = [
  { label: "{{name}}", description: "Recipient's name" },
  { label: "{{email}}", description: "Recipient's email" },
];

export default function Compose() {
  const { subject, setSubject, content, setContent } = useEmail();
  const { user } = useAuth();
  const [templateName, setTemplateName] = useState("");
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSaveTemplate = async () => {
    if (!templateName.trim() || !subject.trim() || !content.trim()) {
      toast.error("Please fill in template name, subject, and content");
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("templates").insert({
      user_id: user?.id,
      name: templateName,
      subject,
      content,
    });

    if (error) {
      toast.error("Failed to save template");
    } else {
      toast.success("Template saved successfully!");
      setTemplateName("");
      setDialogOpen(false);
    }
    setSaving(false);
  };

  const insertPlaceholder = (placeholder: string) => {
    setContent(content + placeholder);
  };

  const getPreviewContent = () => {
    return content
      .replace(/\{\{name\}\}/g, "Ashish")
      .replace(/\{\{email\}\}/g, "ashish@example.com");
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          Compose Message
        </h1>
        <p className="text-muted-foreground mt-2">
          Write your email template with personalization placeholders
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Editor</CardTitle>
                  <CardDescription>Compose your email with placeholders</CardDescription>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save as Template</DialogTitle>
                      <DialogDescription>
                        Give your template a name to reuse it later
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Template Name</Label>
                        <Input
                          placeholder="e.g., Welcome Email"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleSaveTemplate}
                        className="w-full gradient-primary text-primary-foreground"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Template"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Available Placeholders</Label>
                <div className="flex flex-wrap gap-2">
                  {placeholders.map((p) => (
                    <Badge
                      key={p.label}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => insertPlaceholder(p.label)}
                    >
                      {p.label}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Click to insert into message
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Message Body</Label>
                <Textarea
                  id="content"
                  placeholder="Hello {{name}},

Welcome to our platform! We're excited to have you on board.

Best regards,
Your Team"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[250px] resize-none font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <CardTitle>Live Preview</CardTitle>
              </div>
              <CardDescription>
                See how your email will look to recipients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-muted/30 p-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Subject
                    </p>
                    <p className="font-medium text-foreground">
                      {subject || "No subject"}
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      To
                    </p>
                    <p className="text-sm text-foreground">
                      ashish@example.com
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Message
                    </p>
                    <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                      {getPreviewContent() || (
                        <span className="text-muted-foreground italic">
                          Start typing to see the preview...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-accent/50 border border-accent">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Personalization Tips
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use {"{{name}}"} and {"{{email}}"} placeholders to personalize each
                      email. They'll be replaced with actual data from your Excel file.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
