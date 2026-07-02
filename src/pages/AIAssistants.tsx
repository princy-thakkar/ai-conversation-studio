import { Bot, Plus, Settings, Play, BarChart2, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Button } from '../components';

const assistants = [
  { id: '1', name: 'Customer Support Bot', model: 'GPT-4', status: 'Active', conversations: 12647, successRate: 94.2 },
  { id: '2', name: 'Sales Assistant', model: 'GPT-4', status: 'Active', conversations: 8432, successRate: 89.5 },
  { id: '3', name: 'Technical Support', model: 'Claude-3', status: 'Active', conversations: 5621, successRate: 92.1 },
  { id: '4', name: 'FAQ Bot', model: 'GPT-3.5', status: 'Inactive', conversations: 3214, successRate: 87.3 },
  { id: '5', name: 'Onboarding Guide', model: 'Claude-3', status: 'Draft', conversations: 0, successRate: 0 },
];

export default function AIAssistants() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'AI Assistants' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            AI Assistants
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and configure your AI-powered assistants
          </p>
        </div>
        <Button onClick={() => navigate('/testing')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Assistant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            className={`rounded-xl border transition-all hover:shadow-lg ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className={`flex items-center gap-3`}>
                  <div className={`rounded-lg p-2.5 ${
                    assistant.status === 'Active'
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-500'
                      : assistant.status === 'Draft'
                        ? 'bg-gray-400'
                        : 'bg-gray-300'
                  }`}>
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {assistant.name}
                    </h3>
                    <p className="text-sm text-gray-500">{assistant.model}</p>
                  </div>
                </div>
                <button
                onClick={() => navigate('/settings')}
                className={`rounded-lg p-1.5 ${
                  theme === 'dark'
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Status</span>
                  <span className={`font-medium ${
                    assistant.status === 'Active' ? 'text-green-500' : 'text-gray-400'
                  }`}>{assistant.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Conversations</span>
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {assistant.conversations.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Success Rate</span>
                  <span className={`font-medium ${
                    assistant.successRate >= 90 ? 'text-green-500' : assistant.successRate >= 80 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {assistant.successRate}%
                  </span>
                </div>
              </div>
            </div>

            <div
            className={`grid grid-cols-3 border-t ${
              theme === 'dark'
                ? 'border-gray-700'
                : 'border-gray-200'
            }`}
          >
            <button
              onClick={() => navigate('/testing')}
              className={`flex items-center justify-center gap-1 py-3 text-xs font-medium transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              Test
            </button>

            <button
              onClick={() => navigate('/settings')}
              className={`flex items-center justify-center gap-1 py-3 text-xs font-medium border-x transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-400 border-gray-700'
                  : 'hover:bg-gray-50 text-gray-600 border-gray-200'
              }`}
            >
              <Settings className="h-3.5 w-3.5" />
              Configure
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className={`flex items-center justify-center gap-1 py-3 text-xs font-medium transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" />
              Analytics
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
