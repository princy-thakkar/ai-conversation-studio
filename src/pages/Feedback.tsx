import { MessageSquare, Star, Filter, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Breadcrumb, Button, SearchBar, Textarea } from '../components';
import Modal from '../components/Modal';

const initialFeedbackItems = [
  { id: '1', user: 'john@example.com', assistant: 'Customer Support Bot', rating: 5, comment: 'Great help with my order issue. Very quick and accurate response!', date: '2024-01-15', helpful: 12 },
  { id: '2', user: 'sarah@example.com', assistant: 'Sales Assistant', rating: 4, comment: 'Good product recommendations, but took a bit long to understand my needs.', date: '2024-01-15', helpful: 5 },
  { id: '3', user: 'mike@example.com', assistant: 'Technical Support', rating: 5, comment: 'Solved my API issue in minutes. Excellent technical knowledge.', date: '2024-01-14', helpful: 18 },
  { id: '4', user: 'anna@example.com', assistant: 'FAQ Bot', rating: 3, comment: 'Could not find answer to my question. Had to escalate to human support.', date: '2024-01-14', helpful: 3 },
  { id: '5', user: 'tim@example.com', assistant: 'Customer Support Bot', rating: 5, comment: 'Very patient and helpful with my refund request.', date: '2024-01-13', helpful: 9 },
];

export default function Feedback() {
  const { theme } = useTheme();
  const [feedbackItems, setFeedbackItems] = useState(initialFeedbackItems);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState('all');
  const [search, setSearch] = useState('');

  const markHelpful = (id: string) => {
    setFeedbackItems(prev => prev.map(f => f.id === id ? { ...f, helpful: f.helpful + 1 } : f));
  };

  const markUnhelpful = (id: string) => {
    setFeedbackItems(prev => prev.map(f => f.id === id ? { ...f, helpful: Math.max(0, f.helpful - 1) } : f));
  };

  const filteredFeedback = feedbackItems
    .filter((f) => filterRating === 'all' || f.rating === parseInt(filterRating))
    .filter((f) => {
      const q = search.toLowerCase();
      return (
        f.comment.toLowerCase().includes(q) ||
        f.user.toLowerCase().includes(q) ||
        f.assistant.toLowerCase().includes(q)
      );
    });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Feedback' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            User Feedback
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Review and manage feedback from conversations
          </p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = feedbackItems.filter(f => f.rating === rating).length;
          return (
            <button
              key={rating}
              onClick={() => setFilterRating(filterRating === rating.toString() ? 'all' : rating.toString())}
              className={`rounded-xl border p-4 transition-all ${
                filterRating === rating.toString()
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className={`rounded-xl border p-4 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <SearchBar
          placeholder="Search feedback..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredFeedback.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border p-6 transition-all ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-3 ${
                  item.rating >= 4 ? 'bg-green-100' : item.rating >= 3 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <MessageSquare className={`h-5 w-5 ${
                    item.rating >= 4 ? 'text-green-600' : item.rating >= 3 ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {item.user}
                    </p>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{item.assistant}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.comment}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => markHelpful(item.id)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-500">
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({item.helpful})
                </button>
                <button onClick={() => markUnhelpful(item.id)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500">
                  <ThumbsDown className="h-4 w-4" />
                </button>
              </div>
              <Button variant="outline" onClick={() => setSelectedFeedback(item.id)}>
                Reply
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={selectedFeedback !== null}
        onClose={() => setSelectedFeedback(null)}
        title="Reply to Feedback"
        size="md"
      >
        <div className="space-y-4">
          <Textarea
            label="Your response"
            placeholder="Write a thoughtful response to this feedback..."
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
              Cancel
            </Button>
            <Button onClick={() => setSelectedFeedback(null)}>
              Send Reply
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}