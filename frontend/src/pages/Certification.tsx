import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Award, CheckCircle, XCircle, Download } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { validateCertificate } from "@/services/api";
import { toast } from "sonner";

interface CertificateData {
  valid: boolean;
  studentName: string;
  internshipDomain: string;
  period: string;
  downloadUrl: string | null;
}

const Certification = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<
    "success" | "error" | null
  >(null);
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!certificateId.trim()) return;

    setIsVerifying(true);
    setVerificationResult(null);
    setCertificateData(null);

    try {
      const data = await validateCertificate(certificateId);
      if (data.valid) {
        setCertificateData(data);
        setVerificationResult("success");
      } else {
        setVerificationResult("error");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setVerificationResult("error");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <RevealOnScroll>
        <section className="bg-gradient-to-r from-primary via-primary to-blue-600 py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Certificate Verification
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Verify the authenticity of certificates issued by BigBets.AI.
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Verification Form */}
      <RevealOnScroll>
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white dark:bg-card border border-transparent dark:border-border rounded-2xl shadow-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white dark:bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Verify Your Certificate
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter the unique ID found on the certificate to verify its
                  authenticity.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Enter Certificate ID (e.g., HX15SE11211)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="pl-12 h-14 bg-white dark:bg-background border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md"
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  />
                </div>
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying || !certificateId.trim()}
                  className="bg-primary hover:bg-primary/90 text-white h-14 px-8 flex items-center gap-2 font-medium rounded-lg"
                >
                  <Search className="w-4 h-4" />
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              </div>

              {/* Verification Result */}
              {verificationResult === "success" && certificateData && (
                <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-green-800 dark:text-green-300 text-lg mb-2">
                        Certificate Verified!
                      </h3>
                      <div className="text-green-700 dark:text-green-400 text-sm space-y-1 mb-4">
                        <p>
                          <span className="font-semibold">Student Name:</span>{" "}
                          {certificateData.studentName}
                        </p>
                        <p>
                          <span className="font-semibold">Domain:</span>{" "}
                          {certificateData.internshipDomain}
                        </p>
                        <p>
                          <span className="font-semibold">Period:</span>{" "}
                          {certificateData.period}
                        </p>
                      </div>
                      <p className="text-green-600 dark:text-green-500 text-sm mb-4">
                        This certificate is authentic and was issued by
                        BigBets.AI.
                      </p>

                      {/* Certificate Preview & Download */}
                      <div className="w-full mt-6 border-t border-green-200 dark:border-green-900/30 pt-6">
                        {certificateData.downloadUrl && (
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                              Certificate Preview
                            </h4>

                            <div className="w-full bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden aspect-video">
                              {certificateData.downloadUrl
                                .toLowerCase()
                                .endsWith(".pdf") ? (
                                <iframe
                                  src={`${certificateData.downloadUrl}#toolbar=0&navpanes=0&view=FitH`}
                                  className="w-full h-full border-none"
                                  title="Certificate Preview"
                                />
                              ) : (
                                <img
                                  src={certificateData.downloadUrl}
                                  alt="Certificate Preview"
                                  className="w-full h-full object-fill"
                                />
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end pt-2">
                              <Button
                                className="bg-primary hover:bg-primary/90 text-white"
                                onClick={() =>
                                  window.open(
                                    certificateData.downloadUrl!,
                                    "_blank"
                                  )
                                }
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download Certificate
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {verificationResult === "error" && (
                <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800 dark:text-red-300 text-lg">
                        Certificate Not Found
                      </h3>
                      <p className="text-red-600 dark:text-red-400">
                        We couldn't find a certificate with this ID. Please
                        check and try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Info Section */}
      <RevealOnScroll>
        <section className="py-16 bg-gray-50 dark:bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why Verify Your Certificate?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                Certificate verification ensures that your credentials are
                authentic and recognized by employers worldwide.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-card border border-transparent dark:border-border p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Authenticity
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Confirm the certificate is genuine and issued by BigBets.AI.
                  </p>
                </div>
                <div className="bg-white dark:bg-card border border-transparent dark:border-border p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Credibility
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Enhance your professional credibility with verified
                    credentials.
                  </p>
                </div>
                <div className="bg-white dark:bg-card border border-transparent dark:border-border p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Easy Verification
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Quick and simple verification process for employers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <Footer />
    </div>
  );
};

export default Certification;
