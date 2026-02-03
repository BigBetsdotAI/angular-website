import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Calendar, 
  ChevronRight, 
  Play,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DifficultyBadge } from '@/components/ui/difficulty-badge';
import { CategoryBadge } from '@/components/ui/category-badge';
import { Button } from '@/components/ui/button';
import { supabase, type Problem, type Streak } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function DailyChallengePage() {
  const [dailyProblem, setDailyProblem] = useState<Problem | null>(null);
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    fetchDailyProblem();
    if (user) {
      fetchStreak();
      checkTodayCompletion();
    }
  }, [user]);

  const fetchDailyProblem = async () => {
    // Get today's daily challenge
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('is_daily', true)
      .maybeSingle();

    if (!error && data) {
      setDailyProblem(data as Problem);
    }
    setLoading(false);
  };

  const fetchStreak = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setStreak(data as Streak);
    }
  };

  const checkTodayCompletion = async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    
    const { data } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'accepted')
      .gte('created_at', today)
      .limit(1);

    setHasCompletedToday(!!data && data.length > 0);
  };

  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateFormatted = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <MainLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-warning/20">
              <Flame className="w-6 h-6 text-warning" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Daily Challenge</h1>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{dayOfWeek}, {dateFormatted}</span>
          </div>
        </motion.div>

        {/* Streak banner */}
        {user && streak && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-warning/20 to-destructive/20 border border-warning/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-warning streak-fire">
                  🔥 {streak.current_streak}
                </div>
                <div>
                  <p className="font-medium text-foreground">Day Streak</p>
                  <p className="text-sm text-muted-foreground">
                    {hasCompletedToday 
                      ? "You've completed today's challenge!"
                      : "Solve today's problem to keep your streak"}
                  </p>
                </div>
              </div>
              {hasCompletedToday && (
                <div className="px-4 py-2 rounded-full bg-success/20 text-success font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Complete
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Daily problem */}
        {loading ? (
          <div className="p-12 rounded-2xl border border-border bg-card animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        ) : dailyProblem ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            {/* Problem header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {dailyProblem.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2">
                    <DifficultyBadge difficulty={dailyProblem.difficulty} />
                    <CategoryBadge category={dailyProblem.category} />
                  </div>
                </div>
                <Link to={`/problems/${dailyProblem.slug}`}>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Play className="w-4 h-4 mr-2" />
                    Start Challenge
                  </Button>
                </Link>
              </div>
              
              <p className="text-muted-foreground">
                {dailyProblem.description}
              </p>
            </div>

            {/* Problem details */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Objective
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dailyProblem.evaluation_metric === 'rmse' && 
                    "Build a regression model and minimize the Root Mean Square Error on the test set."}
                  {dailyProblem.evaluation_metric === 'accuracy' && 
                    "Build a classification model and maximize accuracy on the test set."}
                  {dailyProblem.evaluation_metric === 'f1_score' && 
                    "Build a classification model and maximize the F1 score on the test set."}
                  {dailyProblem.evaluation_metric === 'recall_at_5' && 
                    "Build a retrieval system and maximize Recall@5 on the test queries."}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Target
                </h3>
                <div className="text-sm">
                  <span className="text-muted-foreground">Metric: </span>
                  <span className="font-mono text-primary">{dailyProblem.evaluation_metric.toUpperCase()}</span>
                  {dailyProblem.target_threshold && (
                    <>
                      <span className="text-muted-foreground"> • Target: </span>
                      <span className="font-mono text-primary">{"< "}{dailyProblem.target_threshold}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Complete this challenge to maintain your streak!
              </p>
              <Link to={`/problems/${dailyProblem.slug}`} className="flex items-center gap-1 text-primary hover:underline font-medium">
                View Full Problem
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="p-12 rounded-2xl border border-border bg-card text-center">
            <p className="text-muted-foreground mb-4">No daily challenge available today</p>
            <Link to="/problems">
              <Button variant="outline">
                Browse All Problems
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* Tips section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-2xl border border-border bg-card"
        >
          <h3 className="font-semibold text-foreground mb-4">💡 Tips for Success</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Start with exploratory data analysis to understand the dataset</li>
            <li>• Try simple models first, then iterate to improve</li>
            <li>• Cross-validation helps prevent overfitting</li>
            <li>• Feature engineering often matters more than model complexity</li>
          </ul>
        </motion.div>
      </div>
    </MainLayout>
  );
}
