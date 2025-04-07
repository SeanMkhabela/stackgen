import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// Type definitions for API responses
export interface AuthResponse {
  success: boolean;
  message: string;
  userId: string;
  token: string;
}

export interface ApiKeyResponse {
  success: boolean;
  key?: string;
  keyId?: string;
  expiresAt?: string;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
}

// Base API URL from environment variables - fallback to localhost:3001 as per docs
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
console.log('Using API base URL:', API_BASE_URL);

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add debug interceptor to log all requests
apiClient.interceptors.request.use(request => {
  console.log('Starting API Request:', request.method?.toUpperCase(), `${request.baseURL ?? ''}${request.url ?? ''}`, request.data);
  return request;
});

// Debug response handling
apiClient.interceptors.response.use(
  response => {
    console.log('API Response Success:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API Response Error:', error.config?.url, error.response?.status, error.message);
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => Promise.reject(error instanceof Error ? error : new Error('Request configuration error'))
);

// Handle API errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear invalid credentials
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }

    // Handle rate limiting with exponential backoff
    if (error.response?.status === 429) {
      const retryAfter = parseInt(error.response.headers['retry-after'] ?? '5', 10);
      toast.error(`Rate limit exceeded. Please try again in ${retryAfter} seconds.`);
    }
    
    return Promise.reject(error);
  }
);

// Create an API client that uses an API key instead of JWT
export const createApiKeyClient = (apiKey: string): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    }
  });
  
  // Add similar interceptors as the main client
  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'] ?? '5', 10);
        console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
      }
      return Promise.reject(error);
    }
  );
  
  return client;
};

// Authentication API methods
export const authAPI = {
  /**
   * Create a new user account
   */
  signUp: async (email: string, password: string, name?: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signup', { email, password, name });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('Signup error:', axiosError.response?.data);
      throw new Error(axiosError.response?.data?.message ?? 'Signup failed');
    }
  },
  
  /**
   * Sign in with existing credentials
   */
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('Attempting to sign in with:', { email });
      const response = await apiClient.post<AuthResponse>('/auth/signin', { email, password });
      console.log('Sign in successful, response:', response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('Login error details:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        message: axiosError.message
      });
      throw new Error(axiosError.response?.data?.message ?? 'Login failed');
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async (): Promise<void> => {
    // Clear local storage regardless of API call success
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Get the current user profile
   */
  getCurrentUser: async () => {
    try {
      // If your backend doesn't have this endpoint, you could return cached user data
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
      // If your backend does have this endpoint, uncomment:
      // const response = await apiClient.get('/auth/me');
      // return response.data;
      throw new Error('User data not found');
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }
};

// API Key management
export const apiKeyAPI = {
  /**
   * Create a new API key
   */
  create: async (name: string, expiresIn: string = '90d'): Promise<ApiKeyResponse> => {
    const response = await apiClient.post<ApiKeyResponse>('/api-keys', { name, expiresIn });
    return response.data;
  },
  
  /**
   * List all API keys for the authenticated user
   */
  list: async () => {
    const response = await apiClient.get('/api-keys');
    return response.data;
  },
  
  /**
   * Revoke an API key
   */
  revoke: async (keyId: string) => {
    const response = await apiClient.delete(`/api-keys/${keyId}`);
    return response.data;
  }
};

// Utility API for basic server connectivity
export const utilityAPI = {
  /**
   * Simple ping endpoint to check server connectivity
   */
  ping: async () => {
    try {
      const response = await apiClient.get('/ping');
      return response.data;
    } catch (error) {
      console.error('Ping error:', error);
      return { message: 'Backend connection failed' };
    }
  }
};

// Export the fetchPing function for backward compatibility
export const fetchPing = async () => {
  try {
    return await utilityAPI.ping();
  } catch (error) {
    console.error('Ping failed:', error);
    return { message: 'Backend connection failed' };
  }
};

// Generation API
export const generateAPI = {
  /**
   * Download a boilerplate for a specific stack
   */
  downloadStack: async (stackType: string) => {
    const toastId = toast.loading('Preparing your stack for download...', {
      icon: '🚀',
    });
    
    try {
      // Updated supported stacks array to match backend capability
      const supportedStacks = ['react', 'django', 'shopify', 'hubspot', 'react-express'];
      let finalStackType = stackType;
      
      // If the requested stack isn't directly supported, use react as fallback
      if (!supportedStacks.includes(stackType)) {
        console.log(`Stack type "${stackType}" is not directly supported, falling back to "react"`);
        finalStackType = 'react';
      }
      
      console.log(`Requesting download for stack: ${finalStackType}`);
      
      const response = await apiClient.get(`/generate/${finalStackType}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/zip',
        },
      });
      
      if (!response.status || response.status >= 400) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      // Use the original stack name for the download file, but fetch the supported type
      a.download = `${stackType}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`✨ Your ${stackType} stack is ready! ✨`, {
        id: toastId,
        icon: '🎉',
        duration: 4000,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed. Please try again.', { id: toastId });
      throw error;
    }
  }
};

// Export the downloadGeneratedStack function for frontend-backend combinations
export const downloadGeneratedStack = async (frontend: string, backend: string) => {
  // Handle react-express combination directly since we now support it in the backend
  if (frontend === 'react' && backend === 'express') {
    console.log('Downloading react-express stack');
    return generateAPI.downloadStack('react-express');
  }
  
  // Handle other combinations by trying direct format first,
  // then falling back to individual components if available
  const combinedStack = `${frontend}-${backend}`;
  const supportedStacks = ['react', 'django', 'shopify', 'hubspot', 'react-express'];
  
  // If the directly combined stack is supported, use it
  if (supportedStacks.includes(combinedStack)) {
    return generateAPI.downloadStack(combinedStack);
  }
  
  // If frontend is directly supported, use that
  if (supportedStacks.includes(frontend)) {
    console.log(`Using ${frontend} as fallback for ${combinedStack}`);
    return generateAPI.downloadStack(frontend);
  }
  
  // If backend is directly supported, use that
  if (supportedStacks.includes(backend)) {
    console.log(`Using ${backend} as fallback for ${combinedStack}`);
    return generateAPI.downloadStack(backend);
  }
  
  // Last resort fallback to react
  console.log(`No direct mapping found for ${combinedStack}, using react as fallback`);
  return generateAPI.downloadStack('react');
};

// Export the main API client for other custom requests
export default apiClient;
