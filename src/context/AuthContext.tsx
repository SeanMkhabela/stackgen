import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, AuthProviderProps, User } from './authTypes';

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In a real app, you would verify the token with your backend
        const token = localStorage.getItem('authToken');
        if (token) {
          // For demo purposes, we'll just assume a token means they're logged in
          // In a real app, you would decode the token or make an API call to get user info
          const userString = localStorage.getItem('user');
          if (userString) {
            setUser(JSON.parse(userString));
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear potentially corrupted auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real app, you would make an API call to verify credentials
      // This is just a mock implementation
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials (this would be done on the server in a real app)
      // For demo, accept any non-empty values
      if (!email || !password) {
        throw new Error('Invalid credentials');
      }
      
      // Create mock user and token
      const mockUser = {
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0],
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Save auth data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // In a real app, you would make an API call to create the user
      // This is just a mock implementation
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate input (this would be done on the server in a real app)
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }
      
      // Create mock user and token
      const mockUser = {
        id: 'user-' + Date.now(),
        email,
        name,
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Save auth data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = React.useMemo(() => ({
    isAuthenticated: !!user,
    user,
    login,
    signup,
    logout,
    loading,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
