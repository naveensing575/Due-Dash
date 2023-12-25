import React from 'react'
import styled, { keyframes } from 'styled-components'
import GoogleLoginButton from '../components/Login/GoogleLoginButton'
import { useNavigate } from 'react-router'
import { checkUserExistence } from '../services/firestoreService'

const LoginContainer = styled.div`
  text-align: center;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const levitateAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`

const TextContainer = styled.div`
  color: white;
  margin-bottom: 20px;
  user-select: none;
  span {
    font-family: 'Anton', sans-serif;
    font-weight: bold;
    font-size: 3rem;
    letter-spacing: 2px;
    display: inline-block;
    animation: ${levitateAnimation} 2s infinite;
  }
`

const Login = () => {
  const navigate = useNavigate()

  const handleLoginSuccess = async (userData: any) => {
    // Check if the user is already registered
    const isUserRegistered = await checkUserExistence(userData.uid)

    if (isUserRegistered) {
      navigate('/dashboard')
    } else {
      navigate('/register')
    }
  }

  const handleLoginError = (error: any) => {
    // Print error on failure
    console.error('Login error:', error)
  }

  const generateRandomDelay = () => Math.random() * 1 // Adjust the factor as needed

  return (
    <LoginContainer>
      <TextContainer>
        {'Due-Dash'.split('').map((letter, index) => (
          <span
            key={index}
            style={{ animationDelay: `${generateRandomDelay()}s` }}
          >
            {letter}
          </span>
        ))}
      </TextContainer>
      <GoogleLoginButton
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </LoginContainer>
  )
}

export default Login
