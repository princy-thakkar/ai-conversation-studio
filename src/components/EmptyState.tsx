import { Inbox } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './Form';

interface EmptyStateProps {
  icon?: typeof Inbox;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className={`rounded-full p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Icon className={`h-8 w-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
      </div>
      <h3 className={`mt-4 text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      {description && (
        <p className={`mt-2 max-w-sm text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
