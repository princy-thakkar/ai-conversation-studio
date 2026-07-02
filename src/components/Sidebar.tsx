import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  TestTube,
  History,
  FileText,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/assistants', icon: Bot, label: 'AI Assistants' },
  { path: '/knowledge-base', icon: BookOpen, label: 'Knowledge Base' },
  { path: '/testing', icon: TestTube, label: 'Conversation Testing' },
  { path: '/history', icon: History, label: 'Conversation History' },
  { path: '/prompts', icon: FileText, label: 'Prompt Management' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/feedback', icon: MessageSquare, label: 'Feedback' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r`}
    >
      <div className={`flex h-16 items-center justify-between px-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              AI Studio
            </span>
          </div>
        )}
        {collapsed && <Sparkles className="h-8 w-8 text-blue-600 mx-auto" />}
      </div>

      <nav className="flex-1 space-y-1 p-3 overflow-y-auto h-[calc(100vh-8rem)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
          }
        >
          <User className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Profile</span>}
        </NavLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`mt-3 flex w-full items-center justify-center rounded-lg px-3 py-2 transition-colors ${
            theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
