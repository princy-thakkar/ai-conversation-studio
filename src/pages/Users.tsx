import { Plus, Shield, Mail, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Breadcrumb, Button, SearchBar } from '../components';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { Input, Select } from '../components/Form';

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2 minutes ago', conversations: 156 },
  { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', role: 'Manager', status: 'Active', lastActive: '1 hour ago', conversations: 89 },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Developer', status: 'Active', lastActive: '3 hours ago', conversations: 234 },
  { id: '4', name: 'Anna Wilson', email: 'anna@example.com', role: 'Analyst', status: 'Inactive', lastActive: '2 weeks ago', conversations: 67 },
  { id: '5', name: 'Tim Brown', email: 'tim@example.com', role: 'Developer', status: 'Active', lastActive: '5 days ago', conversations: 45 },
  { id: '6', name: 'Emma Davis', email: 'emma@example.com', role: 'Viewer', status: 'Pending', lastActive: 'Never', conversations: 0 },
];

const columns = [
  {
    key: 'name' as const,
    header: 'User',
    render: (value: string | number, row: typeof users[0]) => {
      const nameValue = String(value);
      return (
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
            row.status === 'Active' ? 'bg-gradient-to-br from-blue-600 to-cyan-500' : 'bg-gray-400'
          }`}>
            {nameValue.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium">{nameValue}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    key: 'role' as const,
    header: 'Role',
    render: (value: string | number) => {
      const roleValue = String(value);
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
          roleValue === 'Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
          roleValue === 'Manager' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
          roleValue === 'Developer' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          <Shield className="h-3 w-3" />
          {roleValue}
        </span>
      );
    },
  },
  {
    key: 'status' as const,
    header: 'Status',
    render: (value: string | number) => {
      const statusValue = String(value);
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusValue === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
          statusValue === 'Inactive' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          {statusValue === 'Active' && <UserCheck className="h-3 w-3" />}
          {statusValue === 'Inactive' && <UserX className="h-3 w-3" />}
          {statusValue === 'Pending' && <Mail className="h-3 w-3" />}
          {statusValue}
        </span>
      );
    },
  },
  { key: 'lastActive' as const, header: 'Last Active' },
  { key: 'conversations' as const, header: 'Conversations' },
];

export default function Users() {
  const { theme } = useTheme();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Users' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            User Management
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage team members and their access permissions
          </p>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      <div className={`rounded-xl border p-4 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            label=""
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'developer', label: 'Developer' },
            ]}
          />
        </div>
      </div>

      <DataTable columns={columns} data={filteredUsers} />

      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite New User"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="user@example.com"
          />
          <Select
            label="Role"
            options={[
              { value: 'viewer', label: 'Viewer' },
              { value: 'analyst', label: 'Analyst' },
              { value: 'developer', label: 'Developer' },
              { value: 'manager', label: 'Manager' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowInviteModal(false)}>
              Send Invitation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}