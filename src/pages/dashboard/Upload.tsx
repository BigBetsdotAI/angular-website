import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload as UploadIcon, FileSpreadsheet, Download, AlertCircle, CheckCircle2, X } from "lucide-react";
import { useEmail, Recipient } from "@/contexts/EmailContext";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UploadExcel() {
  const { recipients, setRecipients } = useEmail();
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const processFile = (file: File) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
      toast.error("Please upload a valid Excel (.xlsx) or CSV file");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);

        const validationErrors: string[] = [];
        const validRecipients: Recipient[] = [];

        jsonData.forEach((row, index) => {
          const name = row.name || row.Name || row.NAME || "";
          const email = row.email || row.Email || row.EMAIL || "";

          if (!name.trim()) {
            validationErrors.push(`Row ${index + 2}: Missing name`);
          }

          if (!email.trim()) {
            validationErrors.push(`Row ${index + 2}: Missing email`);
          } else if (!validateEmail(email.trim())) {
            validationErrors.push(`Row ${index + 2}: Invalid email format (${email})`);
          }

          if (name.trim() && email.trim() && validateEmail(email.trim())) {
            validRecipients.push({ name: name.trim(), email: email.trim() });
          }
        });

        setErrors(validationErrors);
        setRecipients(validRecipients);

        if (validRecipients.length > 0) {
          toast.success(`Loaded ${validRecipients.length} valid recipients`);
        }

        if (validationErrors.length > 0) {
          toast.warning(`Found ${validationErrors.length} issues`);
        }
      } catch (error) {
        toast.error("Failed to parse file. Please check the format.");
        console.error(error);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const downloadSampleExcel = () => {
    const sampleData = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
      { name: "Bob Wilson", email: "bob@example.com" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recipients");
    XLSX.writeFile(workbook, "sample_recipients.xlsx");
    toast.success("Sample file downloaded!");
  };

  const clearRecipients = () => {
    setRecipients([]);
    setFileName("");
    setErrors([]);
    toast.info("Recipients cleared");
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
            <UploadIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          Upload Excel
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload your Excel or CSV file with recipient data
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>
                Upload .xlsx or .csv files with name and email columns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive
                    ? "border-primary bg-accent"
                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-xl bg-accent flex items-center justify-center">
                    <FileSpreadsheet className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supports .xlsx and .csv files
                    </p>
                  </div>
                </div>
              </div>

              {fileName && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-accent">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm font-medium text-foreground">{fileName}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearRecipients}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={downloadSampleExcel}
              >
                <Download className="h-4 w-4" />
                Download Sample Excel
              </Button>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Required Columns</AlertTitle>
                <AlertDescription>
                  Your file must have columns named <strong>name</strong> and <strong>email</strong>
                </AlertDescription>
              </Alert>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>First 5 recipients from your file</CardDescription>
                </div>
                {recipients.length > 0 && (
                  <Badge variant="secondary" className="text-sm">
                    {recipients.length} total
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {recipients.length > 0 ? (
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recipients.slice(0, 5).map((recipient, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{recipient.name}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {recipient.email}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {recipients.length > 5 && (
                    <div className="p-3 text-center text-sm text-muted-foreground bg-muted/30 border-t border-border">
                      ... and {recipients.length - 5} more recipients
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileSpreadsheet className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    Upload a file to preview recipients
                  </p>
                </div>
              )}

              {errors.length > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm font-medium text-destructive mb-2">
                    Validation Issues ({errors.length})
                  </p>
                  <ul className="text-xs text-destructive/80 space-y-1 max-h-32 overflow-y-auto">
                    {errors.slice(0, 5).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                    {errors.length > 5 && (
                      <li>... and {errors.length - 5} more issues</li>
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
