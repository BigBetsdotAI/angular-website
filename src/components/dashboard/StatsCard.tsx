import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  index?: number;
};

export function StatsCard({ 
  title, 
  value, 
  icon, 
  description, 
  trend,
  className,
  index = 0 
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "p-6 rounded-xl border bg-card border-border",
        "hover:border-primary/20 transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-sm font-medium",
            trend.positive ? "text-success" : "text-destructive"
          )}>
            {trend.positive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-muted-foreground mb-1">
        {title}
      </h3>
      
      <div className="text-3xl font-bold text-foreground mb-1">
        {value}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
}
