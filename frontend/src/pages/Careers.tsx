import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Coffee,
  GraduationCap,
  Users,
  MapPin,
  Clock,
  Heart,
  Award,
  Building,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  {
    icon: Coffee,
    title: "Flexible Work Environment",
    description: "Remote work options and flexible hours",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Continuous learning opportunities and skill development",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with talented professionals in a supportive environment",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health benefits and wellness programs",
  },
  {
    icon: Award,
    title: "Recognition & Growth",
    description: "Performance-based recognition and career advancement",
  },
  {
    icon: Building,
    title: "Exciting Projects",
    description: "Work on cutting-edge projects with global clients",
  },
];

const openPositions = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
];

const Careers = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.coverLetter) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
      });
      setLoading(false);
      return;
    }

    // Format message for backend
    const detailedMessage = `
APPLICATION FOR: ${selectedJob}

LinkedIn: ${formData.linkedin || "Not provided"}
Portfolio: ${formData.portfolio || "Not provided"}

---
Cover Letter:
${formData.coverLetter}
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
          title: "Application Sent!",
          description:
            "We've received your application and will review it shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          linkedin: "",
          portfolio: "",
          coverLetter: "",
        });
        setIsDialogOpen(false);
      } else {
        throw new Error(data.message || "Failed to send application");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send application. Please try again later.",
      });
      console.error(error);
    } finally {
      setLoading(false);
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
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Build your career with innovative projects and cutting-edge
              technologies. We welcome talent from all over the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#positions">
                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-base font-medium">
                  View Open Positions
                </Button>
              </a>
              <a href="#culture">
                <Button
                  variant="outline"
                  className="border-white text-primary bg-white hover:bg-gray-100 px-8 py-6 text-base font-medium"
                >
                  Learn About Our Culture
                </Button>
              </a>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Why Join Us Section */}
      <RevealOnScroll>
        <section id="culture" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Why <span className="text-primary">BigBets.AI</span>?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
                Join a company that values innovation, growth, and work-life
                balance
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-card p-8 rounded-xl border-b-4 border-transparent hover:border-primary/20 transition-all duration-300 text-center hover:shadow-xl shadow-sm"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Application Process Section */}
      <RevealOnScroll>
        <section className="py-16 md:py-24 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Application <span className="text-primary">Process</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
                Simple and transparent hiring process
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Apply Online",
                  description: "Submit your application through our portal",
                },
                {
                  step: 2,
                  title: "Initial Review",
                  description:
                    "Our team reviews your application and portfolio",
                },
                {
                  step: 3,
                  title: "Interview",
                  description: "Technical and cultural fit assessment",
                },
                {
                  step: 4,
                  title: "Welcome Aboard",
                  description: "Join our team and start your journey",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Open Positions Section */}
      <RevealOnScroll>
        <section
          id="positions"
          className="py-16 md:py-24 bg-gray-50 dark:bg-muted/10"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Open <span className="text-primary">Positions</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
                Explore our current job openings and find your perfect role
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="bg-white dark:bg-card p-6 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {position.title}
                    </h3>
                    <p className="text-primary font-medium">
                      {position.department}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {position.location}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {position.type}
                    </span>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={() => handleApplyClick(position.title)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Apply for {selectedJob}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Fill out the form below to submit your application.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
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

            <div className="grid md:grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                  placeholder="https://linkedin.com/in/..."
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Portfolio / Website
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                placeholder="https://portfolio.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-gray-900 dark:text-white"
                placeholder="Tell us why you're a great fit for this role..."
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Careers;
