import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import {
  Login,
  Register,
  ForgotPassword,
  OTPVerification,
  ResetPassword,
  Dashboard,
  AIAssistants,
  KnowledgeBase,
  ConversationTesting,
  ConversationHistory,
  PromptManagement,
  Analytics,
  Feedback,
  Users,
  Settings,
  Profile,
  NotFound,
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/verify-otp',
    element: <OTPVerification />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'assistants',
        element: <AIAssistants />,
      },
      {
        path: 'knowledge-base',
        element: <KnowledgeBase />,
      },
      {
        path: 'testing',
        element: <ConversationTesting />,
      },
      {
        path: 'history',
        element: <ConversationHistory />,
      },
      {
        path: 'prompts',
        element: <PromptManagement />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'feedback',
        element: <Feedback />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
