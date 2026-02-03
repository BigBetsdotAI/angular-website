import { supabase } from "@/integrations/supabase/client";

export { supabase };

export type Problem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'ai_engineering' | 'data_science' | 'software_engineering';
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string;
  starter_code: string;
  dataset_url: string | null;
  evaluation_metric: string;
  target_threshold: number | null;
  test_cases: unknown;
  is_daily: boolean;
  daily_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Submission = {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded' | 'pending';
  score: number | null;
  runtime_ms: number | null;
  memory_kb: number | null;
  output: string | null;
  error_message: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type Streak = {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_submission_date: string | null;
  created_at: string;
  updated_at: string;
};

export type UserProblemProgress = {
  id: string;
  user_id: string;
  problem_id: string;
  solved: boolean;
  best_score: number | null;
  attempts: number;
  first_solved_at: string | null;
  last_attempted_at: string | null;
  created_at: string;
};
