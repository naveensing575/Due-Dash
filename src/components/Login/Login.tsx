import React from 'react'
import styled from 'styled-components'
import GoogleLoginButton from './GoogleLoginButton'
import { useNavigate } from 'react-router-dom'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const AppTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`

const App: React.FC = () => {
  const navigate = useNavigate()
  const handleLoginSuccess = (userData: any) => {
    // Print user data on success
    console.log('Login successful:', userData)

    // Redirect to dashboard
    navigate('/dashboard')
  }

  const handleLoginError = (error: any) => {
    // Print error on failure
    console.error('Login error:', error)
  }

  return (
    <AppContainer>
      <AppTitle>Google Login</AppTitle>
      <GoogleLoginButton
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </AppContainer>
  )
}

export default App
