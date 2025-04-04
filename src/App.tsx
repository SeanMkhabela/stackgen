// src/App.tsx
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import SelectStack from './pages/SelectStack'
import Result from './pages/Result'
import Settings from './pages/Settings'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import AuthLayout from './layouts/Authlayout'
import MainLayout from './layouts/Mainlayout'
import Dashboard from './pages/Dashboard'


export default function App() {
  return (
    <Routes>
      {/* Auth routes: use the AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Main app routes: use the MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/select-stack" element={<SelectStack />} />
        <Route path="/result" element={<Result />} />
        <Route path="/settings" element={<Settings />} />

        {/* Add additional protected routes here */}
      </Route>
    </Routes>
  )
}
