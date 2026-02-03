import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Database, 
  Flame, 
  ChevronRight,
  BarChart3,
  Sparkles,
  Zap,
  Target,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  {
    icon: Brain,
    title: 'AI Engineering',
    description: 'Build RAG pipelines, fine-tune models, and master prompt engineering',
    gradient: 'bg-gradient-ai',
  },
  {
    icon: Database,
    title: 'Data Science',
    description: 'Tackle regression, classification, and feature engineering challenges',
    gradient: 'bg-gradient-ds',
  },
  {
    icon: Flame,
    title: 'Daily Challenges',
    description: 'Build your streak with a new AI/DS problem every day',
    gradient: 'bg-gradient-primary',
  },
  {
    icon: BarChart3,
    title: 'Real Metrics',
    description: 'See RMSE, F1, accuracy scores - not just pass/fail results',
    gradient: 'bg-gradient-primary',
  },
];

const stats = [
  { value: '50+', label: 'Problems' },
  { value: '3', label: 'Categories' },
  { value: '∞', label: 'Practice' },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 grid-pattern opacity-30" />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-ai/5" />
      
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AI Code Lab</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/problems" className="text-muted-foreground hover:text-foreground transition-colors">
              Problems
            </Link>
            <Link to="/daily" className="text-muted-foreground hover:text-foreground transition-colors">
              Daily Challenge
            </Link>
            {user ? (
              <Link to="/dashboard">
                <Button variant="default" className="bg-gradient-primary hover:opacity-90">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-primary hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </header>

        {/* Hero */}
        <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Practice AI & Data Science with Real Metrics</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              Master{' '}
              <span className="text-gradient-primary">AI Engineering</span>
              <br />
              One Problem at a Time
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              The coding practice platform built for AI engineers and data scientists. 
              Write Python, train models, and see real performance metrics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to={user ? "/problems" : "/signup"}>
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 glow-primary">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Practicing
                </Button>
              </Link>
              <Link to="/problems">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border hover:bg-card">
                  Browse Problems
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center gap-12 md:gap-20 mt-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Modern AI Workflows
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Not just another coding platform. Practice with real datasets, 
              evaluate with actual ML metrics, and build production-ready skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                step: '01',
                title: 'Choose a Problem',
                description: 'Pick from AI Engineering, Data Science, or Software Engineering challenges.',
              },
              {
                icon: Code,
                step: '02',
                title: 'Write Your Solution',
                description: 'Code in Python with our VS Code-like editor. Access datasets and starter code.',
              },
              {
                icon: Trophy,
                step: '03',
                title: 'Get Real Feedback',
                description: 'See your RMSE, F1-score, accuracy, and more. Track your progress over time.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-90" />
            <div className="absolute inset-0 grid-pattern opacity-10" />
            
            <div className="relative px-8 py-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Level Up Your AI Skills?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of AI engineers and data scientists practicing every day.
              </p>
              <Link to={user ? "/problems" : "/signup"}>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Get Started Free
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">AI Code Lab</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 AI Code Lab. Built for AI practitioners.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
