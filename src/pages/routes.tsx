import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../components/Login/Login'
import Dashboard from './Dashboard'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default Root
