import { Play, Send, Bot, User, TestTube, Settings } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Breadcrumb, Button, Select } from '../components';
import Modal from "../components/Modal";
import { api } from '../lib/api';

const initialMessages = [
  {
    role: "assistant",
    content: "Hello! I'm the Customer Support Bot. How can I help you today?"
  }
];

const assistants = [
  { value: '1', label: 'Customer Support Bot' },
  { value: '2', label: 'Sales Assistant' },
  { value: '3', label: 'Technical Support' },
];


export default function ConversationTesting() {
  const { theme } = useTheme();

  const [showSettings, setShowSettings] = useState(false);

  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [model, setModel] = useState("GPT-4");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful AI assistant."
  );

  const [selectedAssistant, setSelectedAssistant] = useState('1');

  const assistantName =
  assistants.find((a) => a.value === selectedAssistant)?.label ||
  "Customer Support Bot";
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ai-settings");

    if (saved) {
      const settings = JSON.parse(saved);

      setModel(settings.model);
      setTemperature(settings.temperature);
      setMaxTokens(settings.maxTokens);
      setSystemPrompt(settings.systemPrompt);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "conversation",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    const savedConversation = localStorage.getItem("conversation");

    if (savedConversation) {
      setMessages(JSON.parse(savedConversation));
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const history = messages;

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const res = await api.post<{ response: string }>('/conversations/test', {
        assistantId: selectedAssistant,
        message: userMessage.content,
        history,
        systemPrompt,
        model,
        temperature,
        maxTokens,
      });

      const botMessage = {
        role: "assistant",
        content: res.data?.response || "Sorry, I didn't get a response back.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage = {
        role: "assistant",
        content: `⚠️ ${err?.message || 'Something went wrong talking to the AI service.'}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleNewTest = () => {
    setMessages(initialMessages);
    setInput('');
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Conversation Testing' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Conversation Testing
          </h1>

          <p
            className={`mt-1 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Test and debug your AI assistants in real-time
          </p>
        </div>

        <div className="flex gap-2">
          <Button
              variant="outline"
              onClick={() => setShowSettings(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>

          <Button onClick={handleNewTest}>
            <Play className="h-4 w-4 mr-2" />
            New Test
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div
          className={`rounded-xl border p-4 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <h3
            className={`font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Test Configuration
          </h3>

          <div className="space-y-4">
            <Select
              label="Select Assistant"
              options={assistants}
              value={selectedAssistant}
              onChange={(e) => setSelectedAssistant(e.target.value)}
            />

            <div className="space-y-2">
              <label
                className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Test Scenario
              </label>

              <div className="space-y-2">
                {[
                  'Order Inquiry',
                  'Product Question',
                  'Technical Issue',
                  'Returns',
                ].map((scenario) => (
                  <label key={scenario} className="flex items-center gap-2">
                    <input type="radio" name="scenario" />
                    <span
                      className={`text-sm ${
                        theme === 'dark'
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    >
                      {scenario}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div
            className={`rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div
              className={`flex items-center justify-between border-b p-4 ${
                theme === 'dark'
                  ? 'border-gray-700'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-2">
                  <TestTube className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h3
                    className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {assistantName}
                  </h3>

                  <p className="text-sm text-green-500">Active</p>
                </div>
              </div>

              <button
                onClick={handleClearChat}
                className={`text-sm ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Clear Chat
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user'
                      ? 'justify-end'
                      : ''
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-2 h-8 w-8">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] rounded-xl px-4 py-3 ${
                      message.role === 'assistant'
                        ? theme === 'dark'
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>

                  {message.role === 'user' && (
                    <div className="rounded-lg bg-gray-300 p-2 h-8 w-8">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="flex gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-2 h-8 w-8">
                    <Bot className="h-4 w-4 text-white" />
                  </div>

                  <div
                    className={`max-w-[70%] rounded-xl px-4 py-3 ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-current animate-bounce" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={bottomRef}></div>
            </div>

            <div
              className={`border-t p-4 ${
                theme === 'dark'
                  ? 'border-gray-700'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex gap-2">
                <input
                  value={input}
                  disabled={isSending}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSend();
                    }
                  }}
                  placeholder={isSending ? "Waiting for response..." : "Type your message..."}
                  className={`flex-1 rounded-lg border px-4 py-2 disabled:opacity-60 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-100 border-gray-200 text-gray-900'
                  }`}
                />

                <Button onClick={handleSend} isLoading={isSending}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
            </div>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="AI Model Settings"
      >
        <div className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              AI Model
            </label>

            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option>GPT-4</option>
              <option>GPT-4 Turbo</option>
              <option>Claude 3</option>
              <option>Gemini 2.5</option>
              <option>Grok</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Temperature
            </label>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) =>
                setTemperature(Number(e.target.value))
              }
              className="w-full"
            />

            <p>{temperature}</p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Max Tokens
            </label>

            <input
              type="number"
              value={maxTokens}
              onChange={(e) =>
                setMaxTokens(Number(e.target.value))
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              System Prompt
            </label>

            <textarea
              rows={5}
              value={systemPrompt}
              onChange={(e) =>
                setSystemPrompt(e.target.value)
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                localStorage.setItem(
                  "ai-settings",
                  JSON.stringify({
                    model,
                    temperature,
                    maxTokens,
                    systemPrompt,
                  })
                );

                setShowSettings(false);
              }}
            >
              Save
            </Button>
          </div>

        </div>
      </Modal>

    </div>
  );
}