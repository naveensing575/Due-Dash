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
import { useAuth } from './context/AuthContext'

// Custom ProtectedRoute component
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { user } = useAuth()

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" />
  }

  // Render the provided component if user is authenticated
  return element
}

const Root = () => {
  return (
    <Router>
      <Routes>
        {/* Use ProtectedRoute for the dashboard route */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Handle wrong routes and root */}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default Root
