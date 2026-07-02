import {
  Plus,
  Folder,
  File,
  Tag,
  MoreHorizontal,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { Breadcrumb, Button, SearchBar } from "../components";
import Modal from "../components/Modal";

const initialDocuments = [
  {
    id: "1",
    name: "Product FAQs",
    type: "folder",
    items: 24,
    updated: "2 hours ago",
  },
  {
    id: "2",
    name: "Company Policies",
    type: "folder",
    items: 12,
    updated: "1 day ago",
  },
  {
    id: "3",
    name: "Technical Documentation",
    type: "folder",
    items: 86,
    updated: "3 days ago",
  },
  {
    id: "4",
    name: "Return Policy.md",
    type: "file",
    size: "24 KB",
    updated: "2 hours ago",
  },
  {
    id: "5",
    name: "Shipping Info.md",
    type: "file",
    size: "18 KB",
    updated: "5 hours ago",
  },
  {
    id: "6",
    name: "Product Catalog.pdf",
    type: "file",
    size: "2.4 MB",
    updated: "1 day ago",
  },
  {
    id: "7",
    name: "API Reference",
    type: "folder",
    items: 45,
    updated: "4 days ago",
  },
  {
    id: "8",
    name: "Pricing Guide.md",
    type: "file",
    size: "12 KB",
    updated: "1 week ago",
  },
];

const tags = [
  "Product",
  "Support",
  "Technical",
  "Sales",
  "Legal",
  "Onboarding",
];

export default function KnowledgeBase() {
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState(initialDocuments);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);

  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const [documentName, setDocumentName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [renameValue, setRenameValue] = useState("");

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddDocument = () => {
    if (!documentName.trim()) return;

    setDocuments((prev) => [
      {
        id: Date.now().toString(),
        name: documentName,
        type: "file",
        size: "0 KB",
        updated: "Just now",
      },
      ...prev,
    ]);

    setDocumentName("");
    setShowAddModal(false);
  };

  const handleNewFolder = () => {
    if (!folderName.trim()) return;

    setDocuments((prev) => [
      {
        id: Date.now().toString(),
        name: folderName,
        type: "folder",
        items: 0,
        updated: "Just now",
      },
      ...prev,
    ]);

    setFolderName("");
    setShowFolderModal(false);
  };

  const handleRename = () => {
    if (!selectedDoc || !renameValue.trim()) return;

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === selectedDoc.id
          ? { ...doc, name: renameValue }
          : doc
      )
    );

    setShowActionsModal(false);
    setSelectedDoc(null);
    setRenameValue("");
  };

  const handleDelete = () => {
    if (!selectedDoc) return;

    setDocuments((prev) =>
      prev.filter((doc) => doc.id !== selectedDoc.id)
    );

    setShowActionsModal(false);
    setSelectedDoc(null);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Knowledge Base" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Knowledge Base
          </h1>

          <p
            className={`mt-1 text-sm ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Manage documents and resources for AI assistants
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      <div
        className={`rounded-xl border p-4 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowTagsModal(true)}
            >
              <Tag className="h-4 w-4 mr-2" />
              Tags
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowFolderModal(true)}
            >
              <Folder className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearch(tag)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div
        className={`rounded-xl border overflow-hidden ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700 text-gray-400"
              : "bg-gray-50 border-gray-200 text-gray-600"
          }`}
        >
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Updated</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className={`grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 items-center ${
                theme === "dark"
                  ? "border-gray-700 hover:bg-gray-700/50"
                  : "border-gray-100 hover:bg-gray-50"
              }`}
            >
              <div className="col-span-6 flex items-center gap-3">
                {doc.type === "folder" ? (
                  <Folder className="h-5 w-5 text-blue-500" />
                ) : (
                  <File className="h-5 w-5 text-gray-400" />
                )}

                <span
                  className={`font-medium ${
                    theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {doc.name}
                </span>
              </div>

              <div className="col-span-2">
                <span
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {doc.type === "folder"
                    ? `${doc.items} items`
                    : doc.size}
                </span>
              </div>

              <div className="col-span-2">
                <span className="text-sm text-gray-500">
                  {doc.updated}
                </span>
              </div>

              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => {
                  setSelectedDoc(doc);
                  setShowActionsModal(true);
                  }}
                  className={`rounded-lg p-1.5 ${
                    theme === "dark"
                      ? "hover:bg-gray-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500">
            No documents found.
          </div>
        )}
      </div>
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Document">
        <input
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          placeholder="Document name"
          className="w-full border rounded-lg px-3 py-2"
        />
        <Button className="mt-3" onClick={handleAddDocument}>
          Create
        </Button>
      </Modal>

      {/* NEW FOLDER */}
      <Modal isOpen={showFolderModal} onClose={() => setShowFolderModal(false)} title="New Folder">
        <input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder name"
          className="w-full border rounded-lg px-3 py-2"
        />
        <Button className="mt-3" onClick={handleNewFolder}>
          Create Folder
        </Button>
      </Modal>

      {/* TAGS */}
      <Modal isOpen={showTagsModal} onClose={() => setShowTagsModal(false)} title="Tags">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </Modal>

      {/* ACTIONS */}
      <Modal
        isOpen={showActionsModal}
        onClose={() => setShowActionsModal(false)}
        title="Actions"
      >
        {selectedDoc && (
          <div className="space-y-3">

            <p className="font-medium">{selectedDoc.name}</p>

            {/* Rename input */}
            <input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              placeholder="New name"
              className="w-full border rounded-lg px-3 py-2"
            />

            <Button className="w-full" onClick={handleRename}>
              Rename
            </Button>

            <Button className="w-full bg-red-500" onClick={handleDelete}>
              Delete
            </Button>

          </div>
        )}
      </Modal>
    </div>
  );
}