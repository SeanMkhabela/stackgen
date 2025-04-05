// src/App.tsx
import { Routes, Route } from 'react-router-dom'
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

// Route Protection
import ProtectedRoute from './components/ProtectedRoute'

// Context Providers
import { WizardProvider } from './context/WizardContext'

export default function App() {
  return (
    <ErrorBoundary>
      <WizardProvider>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Main app routes */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/select-stack" element={<SelectStack />} />
            
            {/* Protected routes - requires stack selection */}
            <Route element={<ProtectedRoute />}>
              <Route path="/result" element={<Result />} />
            </Route>
            
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </WizardProvider>
    </ErrorBoundary>
  )
}
