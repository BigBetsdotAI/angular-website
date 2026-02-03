import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

type StreakDisplayProps = {
  currentStreak: number;
  longestStreak: number;
};

export function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
  const hasStreak = currentStreak > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "p-6 rounded-xl border",
        hasStreak 
          ? "bg-gradient-to-br from-warning/10 to-destructive/10 border-warning/30" 
          : "bg-card border-border"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center",
          hasStreak ? "bg-warning/20" : "bg-muted"
        )}>
          <Flame 
            className={cn(
              "w-8 h-8",
              hasStreak ? "text-warning streak-fire" : "text-muted-foreground"
            )} 
          />
        </div>
        
        <div>
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-4xl font-bold",
              hasStreak ? "text-warning" : "text-muted-foreground"
            )}>
              {currentStreak}
            </span>
            <span className="text-lg text-muted-foreground">day streak</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Longest streak: {longestStreak} days
          </p>
        </div>
      </div>

      {hasStreak && (
        <div className="mt-4 pt-4 border-t border-warning/20">
          <p className="text-sm text-warning">
            🔥 Keep it up! Solve today's challenge to maintain your streak.
          </p>
        </div>
      )}

      {!hasStreak && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Start solving daily challenges to build your streak!
          </p>
        </div>
      )}
    </motion.div>
  );
}
