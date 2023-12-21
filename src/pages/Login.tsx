// Login.js
import React from 'react'
import styled from 'styled-components'
import GoogleLoginButton from '../components/Login/GoogleLoginButton'
import { useNavigate } from 'react-router'

const LoginContainer = styled.div`
  text-align: center;
  position: relative;
`

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`

const LoginContent = styled.div`
  z-index: 1;
`

const Login = () => {
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
    <LoginContainer>
      <VideoBackground autoPlay loop muted>
        {/* Provide the source of your video file */}
        <source src="../assets/card.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <LoginContent>
        <h2>Login</h2>
        <GoogleLoginButton
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </LoginContent>
    </LoginContainer>
  )
}

export default Login
