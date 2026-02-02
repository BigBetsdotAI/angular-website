import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  History as HistoryIcon,
  Calendar,
  Mail,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Campaign {
  _id: string; // MongoDB uses _id
  id?: string; // Mapped for frontend
  subject: string;
  total_emails: number;
  sent_count: number;
  failed_count: number;
  status: string;
  createdAt: string;
  completed_at: string | null; // check model for consistency
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch(`${API_BASE_URL}/campaigns`, {
          headers: {
            "x-auth-token": token || "",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCampaigns(data.map((c: any) => ({ ...c, id: c._id })));
        }
      } catch (e) {
        console.error("Failed to fetch campaigns");
      }
      setLoading(false);
    };

    fetchCampaigns();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            Completed
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
            <HistoryIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          Campaign History
        </h1>
        <p className="text-muted-foreground mt-2">
          View all your past email campaigns
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>
              {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}{" "}
              sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : campaigns.length > 0 ? (
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Subject</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold text-center">
                        Total
                      </TableHead>
                      <TableHead className="font-semibold text-center">
                        Sent
                      </TableHead>
                      <TableHead className="font-semibold text-center">
                        Failed
                      </TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {campaign.subject}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {format(
                              new Date(campaign.createdAt || new Date()),
                              "MMM d, yyyy",
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {campaign.total_emails}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2 text-success">
                            <CheckCircle2 className="h-4 w-4" />
                            {campaign.sent_count}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2 text-destructive">
                            <XCircle className="h-4 w-4" />
                            {campaign.failed_count}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <HistoryIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  No campaigns yet. Send your first email campaign!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
