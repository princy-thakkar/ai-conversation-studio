import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { theme } = useTheme();

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link
        to="/dashboard"
        className={`p-1 rounded transition-colors ${
          theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
          {item.path ? (
            <Link
              to={item.path}
              className={`rounded px-2 py-1 transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`px-2 py-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
