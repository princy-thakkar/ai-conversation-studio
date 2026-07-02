import { Camera, Mail, Lock, Bell, Shield, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Breadcrumb, Button, Input, Toggle } from '../components';
import { useRef, useState } from 'react';
import { api } from '../lib/api';

export default function Profile() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'U';

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
    // Note: this is a client-side preview only — the backend does not yet
    // persist avatar uploads (no file storage configured). Documented as a
    // known limitation / future enhancement.
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      await api.put(`/users/${user.id}`, { firstName, lastName });
      setSaveMessage('Profile updated successfully');
    } catch (err: any) {
      setSaveMessage(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Profile' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Profile Settings
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your personal account settings and preferences
          </p>
        </div>
      </div>

      <div className={`rounded-xl border p-6 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Profile Picture
        </h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="h-24 w-24 rounded-full object-cover" />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
                {initials}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <button
              onClick={handleAvatarClick}
              className={`absolute bottom-0 right-0 rounded-full p-2 ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Recommended size: 256x256 pixels. JPG, PNG or GIF.
            </p>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" onClick={handleAvatarClick}>Upload New</Button>
              <Button variant="ghost" onClick={() => setAvatarPreview(null)}>Remove</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-xl border p-6 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              value={user?.email ?? ''}
              disabled
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />
          </div>
          {saveMessage && (
            <p className={`mt-4 text-sm ${saveMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {saveMessage}
            </p>
          )}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleUpdateProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Update Profile'}
            </Button>
          </div>
        </div>

        <div className={`rounded-xl border p-6 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-orange-500" />
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">Receive updates about your conversations</p>
                </div>
              </div>
              <Toggle
                checked={notifications.email}
                onChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
              />
            </div>
            <div className={`flex items-center justify-between p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-blue-500" />
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Push Notifications
                  </p>
                  <p className="text-sm text-gray-500">Get instant alerts in your browser</p>
                </div>
              </div>
              <Toggle
                checked={notifications.push}
                onChange={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
              />
            </div>
            <div className={`flex items-center justify-between p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-green-500" />
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Weekly Summary
                  </p>
                  <p className="text-sm text-gray-500">Get a weekly report of your activity</p>
                </div>
              </div>
              <Toggle
                checked={notifications.weekly}
                onChange={() => setNotifications(prev => ({ ...prev, weekly: !prev.weekly }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl border p-6 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Security
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Change Password
            </h3>
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />
              {/* NOTE: change-password is not yet wired to a backend endpoint.
                  Documented as a known limitation / future enhancement. */}
              <Button variant="outline" disabled title="Coming soon">Update Password</Button>
            </div>
          </div>
          <div>
            <h3 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Two-Factor Authentication
            </h3>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-green-500" />
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  2FA is currently disabled
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button variant="outline" disabled title="Coming soon">Enable 2FA</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={` rounded-xl border p-6 border-red-200 ${
        theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50'
      }`}>
        <h2 className={`text-lg font-semibold mb-2 text-red-600`}>
          Danger Zone
        </h2>
        <p className="text-sm text-red-500 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="danger" disabled title="Coming soon">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
      </div>
    </div>
  );
}
