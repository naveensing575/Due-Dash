import React from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
import { AuthProvider } from './context/AuthContext'

const clientID = process.env.REACT_APP_CLIENT_ID as string
const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <AuthProvider>
    <GoogleOAuthProvider clientId={clientID}>
      <App />
    </GoogleOAuthProvider>
  </AuthProvider>,
)
