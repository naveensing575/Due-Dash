import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Registration from './pages/Registration'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Registration />} />

        {/* Handle wrong routes and root */}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default Root
