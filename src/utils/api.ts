const BASE_URL = import.meta.env.VITE_API_URL;
import { toast } from 'react-hot-toast';

export const fetchPing = async () => {
  const res = await fetch(`${BASE_URL}/ping`);
  return res.json();
};

export const signUp = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Signup failed');
    return data;
  };
  
  export const signIn = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Login failed');
    return data;
  };

  export async function downloadGeneratedStack(frontend: string, backend: string) {
    const toastId = toast.loading('Preparing your stack for download...', {
      icon: '🚀',
    });
    
    try {
      const response = await fetch(
        `${BASE_URL}/generate-stack?frontend=${frontend}&backend=${backend}`,
        {
          method: 'GET',
          mode: 'cors', // 👈 Required for cross-origin
          credentials: 'include', // optional (can omit if not using cookies)
          headers: {
            'Accept': 'application/zip',
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${frontend}-${backend}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`✨ Your ${frontend}-${backend} stack is ready! ✨`, {
        id: toastId,
        icon: '🎉',
        duration: 4000,
      });
    } catch (error) {
      console.error('Download error:', error);
      // Fallback to iframe method if fetch fails due to CORS
      console.log('Attempting iframe fallback method...');
      toast.loading('Trying alternative download method...', { id: toastId });
      try {
        await downloadGeneratedStackViaIframe(frontend, backend);
        toast.success(`✨ Your ${frontend}-${backend} stack is ready! ✨`, {
          id: toastId,
          icon: '🎉',
          duration: 4000,
        });
      } catch (fallbackError) {
        toast.error('Download failed. Please try again.', { id: toastId });
        throw fallbackError;
      }
    }
  }
  
  // Iframe fallback method for CORS issues
  function downloadGeneratedStackViaIframe(frontend: string, backend: string) {
    return new Promise<void>((resolve, reject) => {
      // Create a hidden iframe to handle the download
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Set the source to your API endpoint
      iframe.src = `${BASE_URL}/generate-stack?frontend=${frontend}&backend=${backend}`;
      // Listen for load events
      iframe.onload = () => {
        // This may not be 100% reliable for download confirmation
        // but provides some indication of activity
        console.log('Iframe loaded');
      };
      
      iframe.onerror = () => {
        reject(new Error('Iframe download failed'));
      };
      
      // Clean up after a delay
      setTimeout(() => {
        document.body.removeChild(iframe);
        resolve();
      }, 5000);
    });
  }
  
