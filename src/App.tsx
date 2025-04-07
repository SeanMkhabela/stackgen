// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './pages/NotFound'

// Layouts
import AuthLayout from './layouts/Authlayout'
import MainLayout from './layouts/Mainlayout'

// Auth Pages
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

// Main App Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SelectStack from './pages/SelectStack'
import Result from './pages/Result'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import LandingPage from './pages/LandingPage'
import ApiDocs from './pages/ApiDocs'

// Route Protection
import ProtectedRoute from './components/ProtectedRoute'

// Context Providers
import { WizardProvider } from './context/WizardContext'
import { AuthProvider } from './context/AuthProvider'
import ToastProvider from './components/ToastProvider'

// Animation
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const location = useLocation();
  
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <WizardProvider>
          <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              {/* Main app routes that require login */}
              <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/select-stack" element={<SelectStack />} />
                <Route path="/result" element={<Result />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          </AnimatePresence>
          </WizardProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}
