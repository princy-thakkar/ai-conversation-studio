import { Download, Filter, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Breadcrumb, Button, Chart } from '../components';

const metrics = [
  { label: 'Total Conversations', value: '89,234', change: '+12.5%', trend: 'up' },
  { label: 'Avg. Response Time', value: '1.2s', change: '-15.3%', trend: 'up' },
  { label: 'User Satisfaction', value: '4.8/5', change: '+8.2%', trend: 'up' },
  { label: 'Cost per Conversation', value: '$0.12', change: '-5.1%', trend: 'up' },
];

const topAssistants = [
  { name: 'Customer Support Bot', conversations: 12647, rating: 4.9 },
  { name: 'Sales Assistant', conversations: 8432, rating: 4.7 },
  { name: 'Technical Support', conversations: 5621, rating: 4.8 },
  { name: 'FAQ Bot', conversations: 3214, rating: 4.5 },
];

export default function Analytics() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Analytics' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Analytics
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Monitor performance and gain insights from your AI assistants
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`rounded-xl border p-4 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {metric.label}
            </p>
            <div className="mt-2 flex items-end justify-between">
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </p>
              <span className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {metric.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Conversation Volume" type="line" />
        <Chart title="Response Time Distribution" type="bar" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 rounded-xl border p-6 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Top Performing Assistants
            </h2>
            <Button variant="outline" className="text-sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
          <div className="space-y-4">
            {topAssistants.map((assistant, index) => (
              <div key={assistant.name} className={`flex items-center gap-4 p-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <span className={`flex items-center justify-center h-8 w-8 rounded-lg font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-600' :
                  index === 1 ? 'bg-gray-200 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {assistant.name}
                  </p>
                  <p className="text-sm text-gray-500">{assistant.conversations.toLocaleString()} conversations</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {assistant.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-6 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Resolution Rate</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>94.2%</span>
              </div>
              <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-green-500" style={{ width: '94.2%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>User Satisfaction</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>96.0%</span>
              </div>
              <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-blue-500" style={{ width: '96%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>First Contact Resolution</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>78.5%</span>
              </div>
              <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-purple-500" style={{ width: '78.5%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Escalation Rate</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>5.8%</span>
              </div>
              <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-orange-500" style={{ width: '5.8%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
