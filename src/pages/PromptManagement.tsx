import { useState } from "react";
import { Plus, Code, Copy, Pencil, Trash2, Tag } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Breadcrumb, Button, SearchBar } from "../components";
import Modal from "../components/Modal";
import { Input, Select } from "../components/Form";

const initialPrompts = [
  { id: "1", name: "Customer Support - Initial greeting", category: "Support", version: "v2.1", updated: "2 days ago", tokens: 124 },
  { id: "2", name: "Sales - Product recommendation", category: "Sales", version: "v1.5", updated: "1 week ago", tokens: 256 },
  { id: "3", name: "Technical - API documentation", category: "Technical", version: "v3.0", updated: "3 days ago", tokens: 512 },
  { id: "4", name: "Onboarding - New user welcome", category: "Onboarding", version: "v1.2", updated: "1 day ago", tokens: 89 },
  { id: "5", name: "FAQ - Common questions", category: "Support", version: "v4.2", updated: "5 hours ago", tokens: 378 },
  { id: "6", name: "Escalation - Human handoff", category: "Support", version: "v2.0", updated: "2 weeks ago", tokens: 156 },
];

const categories = ["All", "Support", "Sales", "Technical", "Onboarding"];

const categoryOptions = categories
  .filter((c) => c !== "All")
  .map((c) => ({ value: c, label: c }));

interface Prompt {
  id: string;
  name: string;
  category: string;
  version: string;
  updated: string;
  tokens: number;
}

export default function PromptManagement() {
  const { theme } = useTheme();

  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [editPrompt, setEditPrompt] = useState<Prompt | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // SEARCH + FILTER
  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // COPY
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // DELETE
  const handleDelete = (id: string) => {
    setPrompts(prompts.filter((p) => p.id !== id));
  };

  // SAVE (CREATE + EDIT)
  const handleSave = () => {
    if (!editPrompt?.name) return;

    if (isCreating) {
      setPrompts([editPrompt, ...prompts]); // CREATE NEW
      setIsCreating(false);
    } else {
      setPrompts(
        prompts.map((p) => (p.id === editPrompt.id ? editPrompt : p))
      ); // UPDATE
    }

    setEditPrompt(null);
  };

  const handleCloseModal = () => {
    setEditPrompt(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Prompt Management" }]} />

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Prompt Management
          </h1>
          <p className={`mt-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Create and manage AI prompts
          </p>
        </div>

        <Button
          onClick={() => {
            setIsCreating(true);
            setEditPrompt({
              id: Date.now().toString(),
              name: "",
              category: "Support",
              version: "v1.0",
              updated: "now",
              tokens: 0,
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Prompt
        </Button>
      </div>

      {/* SEARCH */}
      <div
        className={`rounded-xl border p-4 ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <SearchBar
          placeholder="Search prompts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className={`rounded-xl border transition-all hover:shadow-lg ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 rounded-lg p-2.5 bg-gradient-to-br from-blue-600 to-cyan-500">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`font-semibold truncate ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                        title={prompt.name}
                      >
                        {prompt.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {prompt.category}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {prompt.version}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                      Tokens
                    </span>
                    <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {prompt.tokens}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                      Last Updated
                    </span>
                    <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {prompt.updated}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`grid grid-cols-3 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <button
                  onClick={() => handleCopy(prompt.name)}
                  className={`flex items-center justify-center gap-1 py-3 text-xs font-medium transition-colors ${
                    theme === "dark"
                      ? "hover:bg-gray-700 text-gray-400"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>

                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditPrompt(prompt);
                  }}
                  className={`flex items-center justify-center gap-1 py-3 text-xs font-medium border-x transition-colors ${
                    theme === "dark"
                      ? "hover:bg-gray-700 text-gray-400 border-gray-700"
                      : "hover:bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(prompt.id)}
                  className={`flex items-center justify-center gap-1 py-3 text-xs font-medium transition-colors text-red-500 ${
                    theme === "dark" ? "hover:bg-red-950/40" : "hover:bg-red-50"
                  }`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`rounded-xl border p-12 text-center ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <Code className={`h-8 w-8 mx-auto mb-3 ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`} />
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
            No prompts match your search.
          </p>
        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={!!editPrompt}
        onClose={handleCloseModal}
        title={isCreating ? "Create Prompt" : "Edit Prompt"}
        size="sm"
      >
        {editPrompt && (
          <div className="space-y-4">
            <Input
              label="Prompt Name"
              placeholder="e.g. Customer Support - Initial greeting"
              value={editPrompt.name}
              onChange={(e) => setEditPrompt({ ...editPrompt, name: e.target.value })}
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={editPrompt.category}
              onChange={(e) => setEditPrompt({ ...editPrompt, category: e.target.value })}
            />

            <Input
              label="Version"
              placeholder="v1.0"
              value={editPrompt.version}
              onChange={(e) => setEditPrompt({ ...editPrompt, version: e.target.value })}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}