import { cn } from '@/lib/utils';
import { Check, X, AlertCircle, Clock, Loader2 } from 'lucide-react';

type Status = 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded' | 'pending';

type StatusBadgeProps = {
  status: Status;
  className?: string;
};

const statusConfig = {
  accepted: {
    label: 'Accepted',
    className: 'status-accepted',
    icon: Check,
  },
  wrong_answer: {
    label: 'Wrong Answer',
    className: 'status-failed',
    icon: X,
  },
  runtime_error: {
    label: 'Runtime Error',
    className: 'status-failed',
    icon: AlertCircle,
  },
  time_limit_exceeded: {
    label: 'Time Limit Exceeded',
    className: 'status-failed',
    icon: Clock,
  },
  pending: {
    label: 'Pending',
    className: 'status-pending',
    icon: Loader2,
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      <Icon className={cn("w-3.5 h-3.5", status === 'pending' && "animate-spin")} />
      {config.label}
    </span>
  );
}
