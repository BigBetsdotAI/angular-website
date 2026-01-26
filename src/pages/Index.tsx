import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Upload, Send, Zap, Shield, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Mail,
    title: "Compose Messages",
    description: "Write emails with dynamic placeholders for personalization",
  },
  {
    icon: Upload,
    title: "Excel Upload",
    description: "Import recipients from Excel or CSV files instantly",
  },
  {
    icon: Send,
    title: "Bulk Sending",
    description: "Send personalized emails to thousands of recipients",
  },
  {
    icon: Zap,
    title: "Live Progress",
    description: "Track email delivery in real-time with progress updates",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared with third parties",
  },
  {
    icon: Users,
    title: "Campaign History",
    description: "View detailed reports of all your past campaigns",
  },
];

const benefits = [
  "No credit card required",
  "Free to get started",
  "Unlimited templates",
  "Real-time analytics",
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Mail className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MailFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button className="gradient-primary text-primary-foreground shadow-glow">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground font-medium">
                Send personalized emails at scale
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Bulk emails,{" "}
              <span className="text-gradient">personally crafted</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Upload your Excel list, compose one message, and watch as each recipient gets
              a personalized email with their name. Simple, fast, and powerful.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/signup">
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow px-8 gap-2">
                  Start Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Sign in
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-success" />
                  {benefit}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to send bulk emails
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete solution for personalized bulk email campaigns
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to send your first campaign?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who trust MailFlow for their bulk email needs
            </p>
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow px-8 gap-2">
                Get Started for Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MailFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
