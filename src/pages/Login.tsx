import React from 'react'
import styled, { keyframes } from 'styled-components'
import GoogleLoginButton from '../components/Login/GoogleLoginButton'
import { useNavigate } from 'react-router'
import { queryUsers } from '../services/firestoreService'
import { useAuth } from '../context/AuthContext'
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
  const { signIn } = useAuth()
  const handleLoginSuccess = async (userData: any) => {
    console.log('Login successful:', userData)

    console.log('Profile Picture URL:', userData.profilePictureUrl)

    try {
      // Query the user based on UID
      const users = await queryUsers('uid', userData.uid)

      if (users.length > 0) {
        // If user is found, navigate to the dashboard
        navigate('/dashboard')
      } else {
        // If user is not found, navigate to the registration page
        navigate('/register')
      }
      signIn(userData)
    } catch (error) {
      console.error('Error during login:', error)
      // Handle the error as needed
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
