import { useState } from "react";
import { Clock, Filter, Download, RefreshCcw, History } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Breadcrumb, Button, SearchBar, Select } from "../components";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";

const conversations = [
  { id: "1", assistant: "Customer Support Bot", user: "john@example.com", status: "Completed", duration: "2m 34s", messages: 12, date: "2024-01-15 14:23" },
  { id: "2", assistant: "Sales Assistant", user: "sarah@example.com", status: "Completed", duration: "1m 12s", messages: 8, date: "2024-01-15 13:45" },
  { id: "3", assistant: "Technical Support", user: "mike@example.com", status: "Escalated", duration: "5m 48s", messages: 24, date: "2024-01-15 11:20" },
  { id: "4", assistant: "FAQ Bot", user: "anna@example.com", status: "Completed", duration: "3m 22s", messages: 15, date: "2024-01-14 16:54" },
  { id: "5", assistant: "Customer Support Bot", user: "tim@example.com", status: "Abandoned", duration: "0m 45s", messages: 4, date: "2024-01-14 15:32" },
];

const columns = [
  { key: "assistant", header: "Assistant" },
  { key: "user", header: "User" },
  { key: "status", header: "Status" },
  { key: "duration", header: "Duration" },
  { key: "messages", header: "Messages" },
  { key: "date", header: "Date" },
];

export default function ConversationHistory() {
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [showActions, setShowActions] = useState(false);
  const [actionRow, setActionRow] = useState<any>(null);

  const searchLower = search.toLowerCase();

  // FILTER + SEARCH
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.assistant.toLowerCase().includes(searchLower) ||
      c.user.toLowerCase().includes(searchLower);

    const matchesFilter =
      filter === "all"
        ? true
        : c.assistant.toLowerCase().includes(filter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const handleRefresh = () => {
    setSearch("");
    setFilter("all");
    setSelectedConversation(null);
  };

  const handleExport = () => {
    const headers = "Assistant,User,Status,Duration,Messages,Date";

    const rows = conversations.map(c =>
      `${c.assistant},${c.user},${c.status},${c.duration},${c.messages},${c.date}`
    );

    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "conversations.csv";
    a.click();
  };

  // STATS (DYNAMIC)
  const total = conversations.length;
  const completed = conversations.filter((c) => c.status === "Completed").length;
  const escalated = conversations.filter((c) => c.status === "Escalated").length;

  const completionRate = ((completed / total) * 100).toFixed(1);

  return (
    <div className="space-y-6">

      <Breadcrumb items={[{ label: "Conversation History" }]} />

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Conversation History
          </h1>
          <p className={`mt-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            View and analyze past conversations
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className={`rounded-xl border p-4 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="flex flex-col sm:flex-row gap-4">

          <div className="flex-1">
            <SearchBar
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select
              label=""
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              options={[
                { value: "all", label: "All Assistants" },
                { value: "customer support bot", label: "Customer Support Bot" },
                { value: "sales assistant", label: "Sales Assistant" },
                { value: "technical support", label: "Technical Support" },
              ]}
            />

            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mt-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <p className="text-sm mb-2">Quick Filters</p>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              All
            </button>

            <button
              onClick={() => setFilter("customer support bot")}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Support
            </button>

            <button
              onClick={() => setFilter("sales assistant")}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Sales
            </button>
          </div>
        </div>
      )}


      {/* TABLE */}
      <div onClick={() => {}}>

        <DataTable
          columns={columns}
          data={filteredConversations}
          onRowClick={(row) => setSelectedConversation(row)}
          onActionClick={(row) => {
            setActionRow(row);
            setShowActions(true);
          }}
        />

      </div>

      {/* STATS */}
      <div className={`rounded-xl border p-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Statistics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <History className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold">{total}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-bold">{completed}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-xl font-bold">{completionRate}%</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Escalated</p>
              <p className="text-xl font-bold">{escalated}</p>
            </div>
          </div>

        </div>
      </div>

      {/* DETAIL MODAL */}
      <Modal
        isOpen={!!selectedConversation}
        onClose={() => setSelectedConversation(null)}
        title="Conversation Details"
      >
        {selectedConversation && (
          <div className="space-y-3">

            <p><b>Assistant:</b> {selectedConversation.assistant}</p>
            <p><b>User:</b> {selectedConversation.user}</p>
            <p><b>Status:</b> {selectedConversation.status}</p>
            <p><b>Messages:</b> {selectedConversation.messages}</p>

            {/* EVALUATION */}
            <div className="pt-3 border-t">
              <p className="font-medium mb-2">Evaluate Response</p>

              <div className="flex gap-2">
                <Button onClick={() =>
                  setFeedback({ ...feedback, [selectedConversation.id]: "good" })
                }>
                  👍 Good
                </Button>

                <Button onClick={() =>
                  setFeedback({ ...feedback, [selectedConversation.id]: "bad" })
                }>
                  👎 Bad
                </Button>

                <Button onClick={() =>
                  setFeedback({ ...feedback, [selectedConversation.id]: "hallucination" })
                }>
                  ⚠ Hallucination
                </Button>
              </div>

              {feedback[selectedConversation.id] && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {feedback[selectedConversation.id]}
                </p>
              )}
            </div>

          </div>
        )}
      </Modal>

      <Modal
        isOpen={showActions}
        onClose={() => setShowActions(false)}
        title="Actions"
      >
        {actionRow && (
          <div className="space-y-3">

            <p className="font-medium">{actionRow.assistant}</p>

            <Button className="w-full" onClick={() => {
              setSelectedConversation(actionRow);
              setShowActions(false);
              }}>View Details</Button>
            <Button className="w-full">Export</Button>

            <Button
              className="w-full bg-red-500"
              onClick={() => {
                console.log("Delete", actionRow.id);
                setShowActions(false);
              }}
            >
              Delete
            </Button>

          </div>
        )}
      </Modal>

    </div>
  );
}