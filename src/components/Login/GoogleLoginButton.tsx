// In GoogleLoginButton.js
import React from 'react'
import styled from 'styled-components'
import { app } from '../../config/firebaseConfig' // Adjust the path as needed
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

interface GoogleLoginButtonProps {
  onSuccess: (tokenResponse: any) => void // Adjust the type based on your needs
  onError: (error: any) => void
}

const StyledGoogleLoginButton = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #317ae2;
  }
`

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
}) => {
  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      // Check if the user canceled the login
      if (!result.user) {
        throw new Error('Google login canceled')
      }

      // Extract user information as needed
      const user = result.user

      // Perform additional actions if needed

      // Call the onSuccess callback with the user or relevant data
      onSuccess(user) // Pass the user or relevant data here
    } catch (error) {
      console.error('Error during Google login:', error)
      onError(error)
    }
  }

  return (
    <StyledGoogleLoginButton onClick={handleGoogleLogin}>
      Sign in with Google 🚀
    </StyledGoogleLoginButton>
  )
}

export default GoogleLoginButton
