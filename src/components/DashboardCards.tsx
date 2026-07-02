import { TrendingUp, TrendingDown, Users, MessageSquare, Bot, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: typeof Users;
  color: string;
}

function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl border p-6 transition-all hover:shadow-lg ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`mt-2 text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
          <div className="mt-2 flex items-center gap-1">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>
        <div className={`rounded-xl p-4 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardCards() {
  const stats = [
    { title: 'Active Users', value: '12,847', change: '+12.5%', trend: 'up' as const, icon: Users, color: 'bg-gradient-to-br from-blue-600 to-blue-700' },
    { title: 'Conversations', value: '89,234', change: '+8.2%', trend: 'up' as const, icon: MessageSquare, color: 'bg-gradient-to-br from-emerald-600 to-emerald-700' },
    { title: 'AI Assistants', value: '45', change: '+5', trend: 'up' as const, icon: Bot, color: 'bg-gradient-to-br from-orange-600 to-orange-700' },
    { title: 'Avg. Response Time', value: '1.2s', change: '-15.3%', trend: 'up' as const, icon: Clock, color: 'bg-gradient-to-br from-purple-600 to-purple-700' },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
