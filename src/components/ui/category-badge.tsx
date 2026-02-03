import { cn } from '@/lib/utils';
import { Brain, Database, Code } from 'lucide-react';

type Category = 'ai_engineering' | 'data_science' | 'software_engineering';

type CategoryBadgeProps = {
  category: Category;
  className?: string;
  showIcon?: boolean;
};

const categoryConfig = {
  ai_engineering: {
    label: 'AI Engineering',
    className: 'category-ai',
    icon: Brain,
  },
  data_science: {
    label: 'Data Science',
    className: 'category-ds',
    icon: Database,
  },
  software_engineering: {
    label: 'Software Engineering',
    className: 'category-swe',
    icon: Code,
  },
};

export function CategoryBadge({ category, className, showIcon = true }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
}
