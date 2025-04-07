import { ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface AuthProviderProps {
  readonly children: ReactNode;
}
