import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
  readonly children: ReactNode;
}

export default function ToastProvider({ children }: Readonly<ToastProviderProps>) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default toast options
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
          },
          // Custom toast styles for different types
          success: {
            duration: 3000,
            style: {
              background: '#1E9956',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#1E9956',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#E53E3E',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#E53E3E',
            },
          },
          loading: {
            duration: Infinity,
            style: {
              background: '#3182CE',
            },
          },
        }}
      />
    </>
  );
}
