import { X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAllRead: () => void;
}

export default function NotificationPanel({ notifications, onClose, onMarkAllRead }: NotificationPanelProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`absolute right-4 top-16 w-80 rounded-lg border shadow-xl ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className={`flex items-center justify-between border-b p-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Notifications
        </h3>
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-b p-3 transition-colors last:border-b-0 ${
              theme === 'dark'
                ? 'border-gray-700 hover:bg-gray-700/50'
                : 'border-gray-100 hover:bg-gray-50'
            } ${notification.unread ? (theme === 'dark' ? 'bg-gray-700/30' : 'bg-blue-50/50') : ''}`}
          >
            <div className="flex items-start gap-3">
              {notification.unread && (
                <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
              )}
              <div className="flex-1">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {notification.title}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {notification.message}
                </p>
                <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`border-t p-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={onMarkAllRead}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Check className="h-4 w-4" />
          Mark all as read
        </button>
      </div>
    </div>
  );
}
