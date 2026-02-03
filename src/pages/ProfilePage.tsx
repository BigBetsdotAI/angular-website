import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar,
  Trophy,
  Flame,
  Brain,
  Database,
  Loader2,
  Camera
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase, type Profile, type Streak } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [streak, setStreak] = useState<Streak | null>(null);
  const [stats, setStats] = useState({
    totalSolved: 0,
    aiSolved: 0,
    dsSolved: 0,
  });

  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
    
    if (user) {
      fetchProfileData();
    }
  }, [user, authLoading, navigate]);

  const fetchProfileData = async () => {
    if (!user) return;

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileData) {
      setProfile(profileData as Profile);
      setFormData({
        username: profileData.username || '',
        full_name: profileData.full_name || '',
        bio: profileData.bio || '',
      });
    }

    // Fetch streak
    const { data: streakData } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (streakData) {
      setStreak(streakData as Streak);
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
      });
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({
        username: formData.username,
        full_name: formData.full_name,
        bio: formData.bio,
      })
      .eq('user_id', user.id);

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully');
    }
    
    setSaving(false);
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
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and view your achievements
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-semibold text-foreground mb-6">Account Details</h2>
              
              {/* Avatar section */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm" className="mb-2" disabled>
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user?.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    className="bg-background border-border resize-none h-24"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {profile ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}</span>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <StatsCard
              title="Current Streak"
              value={streak?.current_streak || 0}
              icon={<Flame className="w-5 h-5" />}
              description={`Longest: ${streak?.longest_streak || 0} days`}
              index={0}
            />
            <StatsCard
              title="Problems Solved"
              value={stats.totalSolved}
              icon={<Trophy className="w-5 h-5" />}
              index={1}
            />
            <StatsCard
              title="AI Engineering"
              value={stats.aiSolved}
              icon={<Brain className="w-5 h-5" />}
              index={2}
            />
            <StatsCard
              title="Data Science"
              value={stats.dsSolved}
              icon={<Database className="w-5 h-5" />}
              index={3}
            />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
