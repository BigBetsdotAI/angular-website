import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Trash2, Edit, Plus, Loader2, Copy } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useEmail } from "@/contexts/EmailContext";
import { API_BASE_URL } from "@/lib/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Template {
  _id: string; // MongoDB uses _id
  id?: string; // Mapped for frontend convenience
  name: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function Templates() {
  const { user } = useAuth();
  const { setSubject, setContent } = useEmail();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
  });
  const [saving, setSaving] = useState(false);

  const fetchTemplates = async () => {
    console.log("Templates: fetching...");
    if (!user) {
      console.log("Templates: No user, aborting fetch");
      setLoading(false);
      return;
    }

    try {
      console.log("Templates: calling API");
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${API_BASE_URL}/templates`, {
        headers: {
          "x-auth-token": token || "",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setTemplates(data);
        } else {
          console.error("Templates data is not an array:", data);
          setTemplates([]);
        }
      } else {
        console.error("Failed to fetch templates:", res.status, res.statusText);
      }
    } catch (e) {
      console.error("Failed to fetch templates:", e);
      toast.error("Could not load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [user]);

  const handleSave = async () => {
    if (
      !formData.name.trim() ||
      !formData.subject.trim() ||
      !formData.content.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("auth_token");
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": token || "",
      };

      if (editingTemplate) {
        const res = await fetch(
          `${API_BASE_URL}/templates/${editingTemplate.id}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify(formData),
          },
        );

        if (res.ok) {
          toast.success("Template updated!");
          fetchTemplates();
        } else {
          throw new Error("Failed to update");
        }
      } else {
        const res = await fetch(`${API_BASE_URL}/templates`, {
          method: "POST",
          headers,
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          toast.success("Template created!");
          fetchTemplates();
        } else {
          throw new Error("Failed to create");
        }
      }
    } catch (e) {
      toast.error("Failed to save template");
    }

    setSaving(false);
    setDialogOpen(false);
    setEditingTemplate(null);
    setFormData({ name: "", subject: "", content: "" });
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      content: template.content,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${API_BASE_URL}/templates/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token || "",
        },
      });

      if (res.ok) {
        toast.success("Template deleted!");
        fetchTemplates();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (e) {
      toast.error("Failed to delete template");
    }
  };

  const handleUseTemplate = (template: Template) => {
    setSubject(template.subject);
    setContent(template.content);
    toast.success("Template loaded into composer!");
  };

  const openNewDialog = () => {
    setEditingTemplate(null);
    setFormData({ name: "", subject: "", content: "" });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded mb-4">
        DEBUG: Templates Component Mounted. Loading:{" "}
        {loading ? "true" : "false"}, Templates: {templates.length}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              Templates
            </h1>
            <p className="text-muted-foreground mt-2">
              Save and reuse your email templates
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="gap-2 gradient-primary text-primary-foreground"
                onClick={openNewDialog}
              >
                <Plus className="h-4 w-4" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingTemplate ? "Edit Template" : "Create Template"}
                </DialogTitle>
                <DialogDescription>
                  {editingTemplate
                    ? "Update your email template"
                    : "Create a reusable email template"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input
                    placeholder="e.g., Welcome Email"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subject Line</Label>
                  <Input
                    placeholder="Email subject..."
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Message Content</Label>
                  <Textarea
                    placeholder="Hello {{name}}..."
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="min-h-[150px]"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  className="w-full gradient-primary text-primary-foreground"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingTemplate
                      ? "Update Template"
                      : "Create Template"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : templates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg truncate">
                      {template.name}
                    </CardTitle>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Template</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{template.name}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(template.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardDescription className="truncate">
                    {template.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {template.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {format(
                        new Date(template.updatedAt || new Date()),
                        "MMM d, yyyy",
                      )}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Copy className="h-3 w-3" />
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-4">
                No templates yet. Create your first template!
              </p>
              <Button onClick={openNewDialog} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Template
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
