import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, getToken, setToken, clearToken } from '../lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On load, if we have a token, ask the backend who we are.
    const init = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await api.get<{ user: User }>('/auth/me');
        setUser(res.data!.user);
      } catch {
        clearToken();
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post<{ token: string; user: User }>('/auth/login', {
        email,
        password,
      });
      setToken(res.data!.token);
      setUser(res.data!.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Invalid email or password' };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const res = await api.post<{ token: string; user: User }>('/auth/register', data);
      setToken(res.data!.token);
      setUser(res.data!.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    clearToken();
  };

  // NOTE: forgotPassword / verifyOTP / resetPassword hit backend endpoints that
  // exist as routes but are still stubbed server-side (no real email/token flow yet).
  // Kept as lightweight client-side flow for demo purposes; document this as a
  // known limitation / future enhancement in your submission.
  const forgotPassword = async (email: string) => {
    try {
      await api.post('/auth/forgot-password', { email });
      localStorage.setItem('reset_email', email);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Email not found' };
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      await api.post('/auth/verify-otp', { email, otp });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Invalid verification code' };
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      await api.post('/auth/reset-password', {
        email,
        password: newPassword,
      });
      localStorage.removeItem('reset_email');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Reset failed' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        verifyOTP,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}