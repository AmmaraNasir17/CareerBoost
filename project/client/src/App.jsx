import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ApplierDashboard from './pages/ApplierDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'
import { interpolate } from './translations/i18n'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/applier" element={<ProtectedRoute><ApplierDashboard /></ProtectedRoute>} />
        <Route path="/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { interpolate }

export default App
