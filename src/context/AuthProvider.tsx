import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext';
import { AuthProviderProps, User } from './authTypes';
import toast from 'react-hot-toast';
import { authAPI } from '../utils/api';

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          try {
            // Verify the token with backend
            const userData = await authAPI.getCurrentUser();
            setUser({
              id: userData.userId,
              email: userData.email,
              name: userData.name ?? userData.email.split('@')[0],
            });
          } catch (error) {
            console.error('Token validation error:', error);
            // Token might be invalid or expired
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
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
    const loginToast = toast.loading('Signing in...');
    try {
      setLoading(true);
      
      // Call the new authAPI.signIn function
      const response = await authAPI.signIn(email, password);
      
      // Save auth data
      localStorage.setItem('authToken', response.token);
      
      // Create user object from response
      const user = {
        id: response.userId,
        email,
        name: email.split('@')[0], // Use email prefix as name since API doesn't return a name
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Signed in successfully!', { id: loginToast });
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed', { id: loginToast });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    const signupToast = toast.loading('Creating your account...');
    try {
      setLoading(true);
      
      // Call the new authAPI.signUp function with name parameter
      const response = await authAPI.signUp(email, password, name);
      
      // Save auth data
      localStorage.setItem('authToken', response.token);
      
      // Create user object from response
      const user = {
        id: response.userId,
        email,
        name: name ?? email.split('@')[0], // Use provided name or fallback
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Account created successfully!', { id: signupToast });
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error(error instanceof Error ? error.message : 'Signup failed', { id: signupToast });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with cleanup even if API call fails
    }
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Signed out successfully');
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
