import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Breadcrumb, DashboardCards, Chart } from '../components';
import DataTable from '../components/DataTable';
import { ArrowUpRight, ArrowDownRight, Activity, Zap } from 'lucide-react';

const recentConversations = [
  { id: '1', assistant: 'Customer Support Bot', user: 'john@example.com', status: 'Completed', duration: '2m 34s', date: '2024-01-15' },
  { id: '2', assistant: 'Sales Assistant', user: 'sarah@example.com', status: 'In Progress', duration: '1m 12s', date: '2024-01-15' },
  { id: '3', assistant: 'Technical Support', user: 'mike@example.com', status: 'Completed', duration: '5m 48s', date: '2024-01-15' },
  { id: '4', assistant: 'FAQ Bot', user: 'anna@example.com', status: 'Escalated', duration: '3m 22s', date: '2024-01-14' },
  { id: '5', assistant: 'Customer Support Bot', user: 'tim@example.com', status: 'Completed', duration: '4m 15s', date: '2024-01-14' },
];

const columns = [
  { key: 'assistant' as const, header: 'Assistant' },
  { key: 'user' as const, header: 'User' },
  {
    key: 'status' as const,
    header: 'Status',
    render: (value: string) => {
      const colors: Record<string, string> = {
        Completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        Escalated: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      };
      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[value]}`}>
          {value}
        </span>
      );
    },
  },
  { key: 'duration' as const, header: 'Duration' },
  { key: 'date' as const, header: 'Date' },
];

export default function Dashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {user?.firstName}!
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Here's what's happening with your AI assistants today
          </p>
        </div>
        <button
        onClick={() => navigate("/testing")}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
        <Zap className="h-4 w-4" />
        Quick Test
      </button>
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Conversation Trends" type="line" />
        <Chart title="Weekly Activity" type="bar" />
      </div>

      <div className={`rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Recent Conversations
          </h2>
          <button onClick={() => navigate('/history')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>
        <DataTable columns={columns} data={recentConversations} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-100 p-3">
              <ArrowUpRight className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>94.2%</p>
            </div>
          </div>
        </div>
        <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Sessions</p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>847</p>
            </div>
          </div>
        </div>
        <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-red-100 p-3">
              <ArrowDownRight className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Escalations</p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>23</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
