import React from 'react'
import styled from 'styled-components'
import { app } from '../../config/firebaseConfig'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import GoogleIcon from '../../assets/googleIcon.svg'

interface GoogleLoginButtonProps {
  onSuccess: (userData: any) => void
  onError: (error: any) => void
}

const StyledGoogleLoginButton = styled.button`
  position: relative;
  background-color: #4285f4;
  color: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;

  .google-icon {
    width: 20px;
    height: 20px;
    transform: translateY(3px);
    margin-left: 5px;
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

      if (!result.user) {
        throw new Error('Google login canceled')
      }

      const user = result.user

      // Extract full name from the displayName property
      const fullName = user.displayName || ''

      // Pass the entire user object with additional info to onSuccess
      onSuccess({
        uid: user.uid,
        email: user.email,
        fullName,
      })
    } catch (error) {
      console.error('Error during Google login:', error)
      onError(error)
    }
  }

  return (
    <StyledGoogleLoginButton onClick={handleGoogleLogin}>
      Sign in with Google{' '}
      <img src={GoogleIcon} alt="Google Icon" className="google-icon" />
    </StyledGoogleLoginButton>
  )
}

export default GoogleLoginButton
