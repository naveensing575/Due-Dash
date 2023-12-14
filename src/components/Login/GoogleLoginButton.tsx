import React from 'react'
import styled from 'styled-components'
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'

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
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess(tokenResponse),
    onError: (error) => onError(error),
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
  })

  return (
    <StyledGoogleLoginButton onClick={() => login()}>
      Sign in with Google 🚀
    </StyledGoogleLoginButton>
  )
}

export default GoogleLoginButton
