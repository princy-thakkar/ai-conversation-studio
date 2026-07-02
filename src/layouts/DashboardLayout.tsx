import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

export default function DashboardLayout() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900'
          : 'bg-gray-100'
      }`}
    >
      <Sidebar />
      <Navbar />

      <main
        className={`ml-64 pt-16 min-h-screen transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900'
            : 'bg-gray-100'
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}