import { useTheme } from '../context/ThemeContext';

interface ChartProps {
  title: string;
  type?: 'line' | 'bar';
}

export default function Chart({ title, type = 'line' }: ChartProps) {
  const { theme } = useTheme();

  const barData = [65, 45, 80, 60, 75, 55, 90];
  const linePoints = '0,100 40,80 80,60 120,70 160,40 200,30 240,50';

  return (
    <div
      className={`rounded-xl border p-6 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      <div className="h-48 w-full">
        {type === 'bar' ? (
          <div className="flex h-full items-end justify-between gap-2">
            {barData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-500 transition-all hover:opacity-80"
                  style={{ height: `${value}%` }}
                />
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <svg viewBox="0 0 240 100" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${linePoints.split(' ').map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join(' ')} L240,100 L0,100 Z`}
              fill="url(#areaGradient)"
            />
            <polyline
              points={linePoints}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {linePoints.split(' ').map((point, index) => (
              <circle
                key={index}
                cx={point.split(',')[0]}
                cy={point.split(',')[1]}
                r="4"
                fill={theme === 'dark' ? '#1f2937' : '#fff'}
                stroke="url(#lineGradient)"
                strokeWidth="3"
                className="transition-all hover:r-6"
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
