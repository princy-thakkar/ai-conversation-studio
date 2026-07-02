import { Save, Bell, Shield, Database, Key, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Breadcrumb, Button, Input, Select, Toggle } from '../components';
import { useState } from 'react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    darkMode: theme === 'dark',
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    errorAlerts: true,
    twoFactor: false,
    sessionTimeout: '30',
    defaultAssistant: '1',
    retentionPeriod: '90',
    maxConversations: '10000',
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Settings' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Configure application preferences and system settings
          </p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`rounded-lg p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Palette className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Appearance
              </h2>
            </div>
            <div className="space-y-4">
              <Toggle
                checked={settings.darkMode}
                onChange={() => {
                  updateSetting('darkMode', !settings.darkMode);
                  toggleTheme();
                }}
                label="Dark Mode"
              />
              <Select
                label="Language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                  { value: 'de', label: 'German' },
                ]}
              />
            </div>
          </div>

          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`rounded-lg p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Bell className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <Toggle
                checked={settings.emailNotifications}
                onChange={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                label="Email Notifications"
              />
              <Toggle
                checked={settings.pushNotifications}
                onChange={() => updateSetting('pushNotifications', !settings.pushNotifications)}
                label="Push Notifications"
              />
              <Toggle
                checked={settings.weeklyReports}
                onChange={() => updateSetting('weeklyReports', !settings.weeklyReports)}
                label="Weekly Reports"
              />
              <Toggle
                checked={settings.errorAlerts}
                onChange={() => updateSetting('errorAlerts', !settings.errorAlerts)}
                label="Error Alerts"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`rounded-lg p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Security
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Toggle
                checked={settings.twoFactor}
                onChange={() => updateSetting('twoFactor', !settings.twoFactor)}
                label="Two-Factor Authentication"
              />
              <Select
                label="Session Timeout"
                options={[
                  { value: '15', label: '15 minutes' },
                  { value: '30', label: '30 minutes' },
                  { value: '60', label: '1 hour' },
                  { value: '120', label: '2 hours' },
                ]}
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
              />
            </div>
          </div>

          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`rounded-lg p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Database className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Data & Storage
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Default Assistant"
                options={[
                  { value: '1', label: 'Customer Support Bot' },
                  { value: '2', label: 'Sales Assistant' },
                  { value: '3', label: 'Technical Support' },
                ]}
                value={settings.defaultAssistant}
                onChange={(e) => updateSetting('defaultAssistant', e.target.value)}
              />
              <Select
                label="Data Retention Period"
                options={[
                  { value: '30', label: '30 days' },
                  { value: '90', label: '90 days' },
                  { value: '180', label: '180 days' },
                  { value: '365', label: '1 year' },
                ]}
                value={settings.retentionPeriod}
                onChange={(e) => updateSetting('retentionPeriod', e.target.value)}
              />
              <Input
                label="Max Conversations per Month"
                type="number"
                value={settings.maxConversations}
                onChange={(e) => updateSetting('maxConversations', e.target.value)}
              />
            </div>
          </div>

          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`rounded-lg p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Key className="h-5 w-5 text-red-500" />
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                API Keys
              </h2>
            </div>
            <div className="space-y-4">
              <Input
                label="OpenAI API Key"
                type="password"
                value="sk-...abc123"
              />
              <Input
                label="Anthropic API Key"
                type="password"
                value="sk-ant-...xyz789"
              />
              <Button variant="outline">
                <Key className="h-4 w-4 mr-2" />
                Generate New Key
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
