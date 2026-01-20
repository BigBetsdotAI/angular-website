import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    projectDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValueChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.projectDetails) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
      });
      setLoading(false);
      return;
    }

    // Format message for backend (which expects quickMessage)
    const detailedMessage = `
Project Details:
${formData.projectDetails}

---
Additional Info:
Company: ${formData.company || "Not provided"}
Service: ${formData.service || "Not selected"}
Budget: ${formData.budget || "Not selected"}
Timeline: ${formData.timeline || "Not selected"}
    `.trim();

    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quickName: formData.name,
          quickEmail: formData.email,
          quickPhone: formData.phone,
          quickMessage: detailedMessage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          budget: "",
          timeline: "",
          projectDetails: "",
        });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again later.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      value: "info@bigbets.ai",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 836 887 1848",
      description: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Crossing Republik, Ghaziabad, India",
      description: "Come say hello at our office",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon-Fri: 9:00 AM - 6:00 PM",
      description: "IST (Indian Standard Time)",
    },
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity and scope. Simple projects may take 1-3 months, while complex enterprise solutions can take 6-12 months. We provide detailed timelines during the consultation phase.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes! We serve clients across 15+ countries and have experience working with different time zones, cultures, and business requirements. We provide remote collaboration and support.",
    },
    {
      question: "What is your development process?",
      answer:
        "We follow an agile development methodology with regular client communication, iterative development, and continuous testing. This ensures transparency and allows for feedback throughout the project.",
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer:
        "Absolutely! We offer comprehensive support and maintenance packages to ensure your software continues to perform optimally. This includes bug fixes, updates, and feature enhancements.",
    },
    {
      question: "Can you help with existing projects or legacy systems?",
      answer:
        "Yes, we specialize in legacy system modernization, code refactoring, and taking over existing projects. We can assess your current system and provide improvement recommendations.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "We work with a wide range of modern technologies including React, Node.js, Python, Java, cloud platforms (AWS, Azure), AI/ML frameworks, and mobile development tools.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar alwaysOpaque />

      {/* Hero Section */}
      <RevealOnScroll>
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-primary to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Ready to transform your business? Let's discuss your project and
              explore how we can help you achieve your goals.
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Multiple Ways to Connect */}
      <RevealOnScroll>
        <section className="py-16 md:py-24 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Multiple Ways to <span className="text-primary">Connect</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
                Choose the most convenient way to reach out to us
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-primary font-medium mb-1">
                    {method.value}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Contact Form & Office Info Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <RevealOnScroll direction="left">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                        placeholder="Your full name"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                        placeholder="your@email.com"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                        placeholder="Your company name"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                        placeholder="+1 (555) 123-4567"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Interested In
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleValueChange("service", value)
                      }
                      value={formData.service}
                    >
                      <SelectTrigger className="w-full h-12 border-gray-200 dark:border-gray-700 bg-white dark:bg-background text-gray-900 dark:text-white">
                        <SelectValue
                          placeholder="Select a service"
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="mobile-development">
                          Mobile Development
                        </SelectItem>
                        <SelectItem value="ai-ml">
                          AI & Machine Learning
                        </SelectItem>
                        <SelectItem value="cloud-solutions">
                          Cloud Solutions
                        </SelectItem>
                        <SelectItem value="cybersecurity">
                          Cybersecurity
                        </SelectItem>
                        <SelectItem value="consulting">
                          IT Consulting
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget Range
                      </label>
                      <Select
                        onValueChange={(value) =>
                          handleValueChange("budget", value)
                        }
                        value={formData.budget}
                      >
                        <SelectTrigger className="w-full h-12 border-gray-200 dark:border-gray-700 bg-white dark:bg-background text-gray-900 dark:text-white">
                          <SelectValue
                            placeholder="Select budget range"
                            className="text-gray-500 dark:text-gray-400"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5k-10k">
                            $5,000 - $10,000
                          </SelectItem>
                          <SelectItem value="10k-25k">
                            $10,000 - $25,000
                          </SelectItem>
                          <SelectItem value="25k-50k">
                            $25,000 - $50,000
                          </SelectItem>
                          <SelectItem value="50k-100k">
                            $50,000 - $100,000
                          </SelectItem>
                          <SelectItem value="100k+">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timeline
                      </label>
                      <Select
                        onValueChange={(value) =>
                          handleValueChange("timeline", value)
                        }
                        value={formData.timeline}
                      >
                        <SelectTrigger className="w-full h-12 border-gray-200 dark:border-gray-700 bg-white dark:bg-background text-gray-900 dark:text-white">
                          <SelectValue
                            placeholder="Select timeline"
                            className="text-gray-500 dark:text-gray-400"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-12-months">
                            6-12 months
                          </SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-gray-900 dark:text-white"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    <Send className="w-5 h-5" />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </RevealOnScroll>

            {/* Office Info Sidebar */}
            <RevealOnScroll direction="right">
              <div className="space-y-6">
                {/* Visit Our Office */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Visit Our Office
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Located in the heart of Kanpur, our office is equipped with
                    modern facilities and a collaborative environment. We
                    welcome clients to visit us for in-person consultations and
                    project discussions.
                  </p>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center bg-gray-50 dark:bg-background">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      BigBets.AI Office
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Crossing Republik, Ghaziabad, India
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>

                {/* Need Immediate Assistance */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Need Immediate Assistance?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Call us directly
                        </p>
                        <p className="text-primary">+91 836 887 1848</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Email us
                        </p>
                        <p className="text-primary">info@bigbets.ai</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Our Response Promise */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Our Response Promise
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We typically respond to all inquiries within 24 hours during
                    business days. For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <RevealOnScroll>
        <section className="py-16 md:py-24 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
                Quick answers to common questions about our services and process
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow bg-gray-50 dark:bg-card"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <Footer />
    </div>
  );
};

export default Contact;
