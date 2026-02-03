import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  Brain,
  Database,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StreakDisplay } from '@/components/dashboard/StreakDisplay';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { supabase, type Problem, type Submission, type Streak } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState<Streak | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<(Submission & { problem?: Problem })[]>([]);
  const [stats, setStats] = useState({
    totalSolved: 0,
    aiSolved: 0,
    dsSolved: 0,
    totalAttempts: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
    
    if (user) {
      fetchDashboardData();
    }
  }, [user, authLoading, navigate]);

  const fetchDashboardData = async () => {
    if (!user) return;

    // Fetch streak
    const { data: streakData } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (streakData) {
      setStreak(streakData as Streak);
    }

    // Fetch recent submissions with problem info
    const { data: submissionsData } = await supabase
      .from('submissions')
      .select('*, problems(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (submissionsData) {
      setRecentSubmissions(submissionsData.map((s: Record<string, unknown>) => ({
        ...s,
        problem: s.problems as Problem | undefined,
      })) as (Submission & { problem?: Problem })[]);
    }

    // Fetch progress stats
    const { data: progressData } = await supabase
      .from('user_problem_progress')
      .select('*, problems(category)')
      .eq('user_id', user.id)
      .eq('solved', true);

    if (progressData) {
      const aiSolved = progressData.filter((p: Record<string, unknown>) => 
        (p.problems as { category: string } | null)?.category === 'ai_engineering'
      ).length;
      const dsSolved = progressData.filter((p: Record<string, unknown>) => 
        (p.problems as { category: string } | null)?.category === 'data_science'
      ).length;

      setStats({
        totalSolved: progressData.length,
        aiSolved,
        dsSolved,
        totalAttempts: recentSubmissions.length,
      });
    }

    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress and stay consistent
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Problems Solved"
            value={stats.totalSolved}
            icon={<Trophy className="w-5 h-5" />}
            description="Keep going!"
            index={0}
          />
          <StatsCard
            title="AI Engineering"
            value={stats.aiSolved}
            icon={<Brain className="w-5 h-5" />}
            index={1}
          />
          <StatsCard
            title="Data Science"
            value={stats.dsSolved}
            icon={<Database className="w-5 h-5" />}
            index={2}
          />
          <StatsCard
            title="Total Attempts"
            value={stats.totalAttempts}
            icon={<Target className="w-5 h-5" />}
            index={3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Streak */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Your Streak</h2>
              <StreakDisplay
                currentStreak={streak?.current_streak || 0}
                longestStreak={streak?.longest_streak || 0}
              />

              <Link to="/daily" className="block mt-4">
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Today's Challenge
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
              
              {recentSubmissions.length === 0 ? (
                <div className="p-8 rounded-xl border border-border bg-card text-center">
                  <p className="text-muted-foreground mb-4">No submissions yet</p>
                  <Link to="/problems">
                    <Button variant="outline">Start Practicing</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentSubmissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">
                            {submission.problem?.title || 'Unknown Problem'}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(submission.created_at).toLocaleDateString()}
                            </span>
                            {submission.score && (
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Score: {submission.score}
                              </span>
                            )}
                          </div>
                        </div>
                        <StatusBadge status={submission.status} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
