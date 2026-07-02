import { Search, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = 'Search...', value, onChange, onSearch }: SearchBarProps) {
  const { theme } = useTheme();

  // Controlled mode: parent passes value + onChange (used by pages that filter live as you type).
  // Uncontrolled mode: neither is passed, falls back to an internal-only input that reports via onSearch on submit/clear.
  const isControlled = value !== undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isControlled) {
      onSearch?.(value ?? '');
    }
  };

  const handleClear = () => {
    if (isControlled) {
      onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
      <input
        type="text"
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border py-2 pl-10 pr-10 text-sm transition-colors ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className={`absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 transition-colors ${
            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </form>
  );
}