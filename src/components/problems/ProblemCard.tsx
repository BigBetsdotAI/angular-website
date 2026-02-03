import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyBadge } from '@/components/ui/difficulty-badge';
import { CategoryBadge } from '@/components/ui/category-badge';
import type { Problem } from '@/lib/supabase';

type ProblemCardProps = {
  problem: Problem;
  solved?: boolean;
  index?: number;
};

export function ProblemCard({ problem, solved = false, index = 0 }: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/problems/${problem.slug}`}
        className={cn(
          "block p-4 rounded-xl border transition-all duration-200",
          "bg-card hover:bg-card/80 border-border",
          "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
          "group"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {solved && (
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-success" />
                </div>
              )}
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {problem.title}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {problem.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={problem.difficulty} />
              <CategoryBadge category={problem.category} />
              <span className="text-xs text-muted-foreground">
                Target: {problem.evaluation_metric.toUpperCase()} 
                {problem.target_threshold && ` < ${problem.target_threshold}`}
              </span>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
        </div>
      </Link>
    </motion.div>
  );
}
