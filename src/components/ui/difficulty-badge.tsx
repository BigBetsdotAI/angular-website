import { cn } from '@/lib/utils';

type Difficulty = 'easy' | 'medium' | 'hard';

type DifficultyBadgeProps = {
  difficulty: Difficulty;
  className?: string;
};

const difficultyConfig = {
  easy: {
    label: 'Easy',
    className: 'difficulty-easy',
  },
  medium: {
    label: 'Medium',
    className: 'difficulty-medium',
  },
  hard: {
    label: 'Hard',
    className: 'difficulty-hard',
  },
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
