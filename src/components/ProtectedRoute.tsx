import { Navigate, Outlet } from 'react-router-dom';
import { useStack } from '../context/StackContext';

export default function ProtectedRoute() {
  const { isStackSelected } = useStack();
  
  // If no stack is selected, redirect to select-stack page
  if (!isStackSelected()) {
    return <Navigate to="/select-stack" replace />;
  }
  
  // Otherwise, render the protected content (children)
  return <Outlet />;
} 