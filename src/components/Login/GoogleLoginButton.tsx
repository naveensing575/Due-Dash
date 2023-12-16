import React from 'react'
import styled from 'styled-components'
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'
import { useAuth } from '../../context/AuthContext'

interface GoogleLoginButtonProps {
  onSuccess: (tokenResponse: TokenResponse) => void
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
  const { signIn } = useAuth()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Fetch user profile using the obtained access_token
      try {
        const profileResponse = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        )

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile')
        }

        const userProfile = await profileResponse.json()

        // Update the user profile in the AuthContext
        signIn({
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
        })

        // Call the original onSuccess callback
        onSuccess(tokenResponse)
      } catch (error) {
        console.error('Error fetching user profile:', error)
        onError(error)
      }
    },
    onError: (error) => onError(error),
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
  })

  const handleLoginClick = () => {
    login() // Wrap the login call in a function
  }

  return (
    <StyledGoogleLoginButton onClick={handleLoginClick}>
      Sign in with Google 🚀
    </StyledGoogleLoginButton>
  )
}

export default GoogleLoginButton
