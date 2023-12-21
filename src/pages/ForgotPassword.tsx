import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import styled from 'styled-components'

interface ForgotPasswordProps {}

const ForgotPasswordContainer = styled.div`
  text-align: center;
`

const ForgotPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
`

const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`

const ResetPasswordButton = styled.button`
  background-color: #e91e63;
  color: #fff;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d81b60;
  }
`

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState('')
  const [resetSuccess, setResetSuccess] = useState<boolean>(false)
  const [resetError, setResetError] = useState<string | null>(null)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      setResetSuccess(true)
    } catch (error: any) {
      console.error('Error sending password reset email:', error)
      setResetError(error.message || 'An unknown error occurred')
    }
  }

  return (
    <ForgotPasswordContainer>
      <h2>Forgot Password</h2>
      <ForgotPasswordForm onSubmit={handleResetPassword}>
        <FormInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <ResetPasswordButton type="submit">Reset Password</ResetPasswordButton>
      </ForgotPasswordForm>
      {resetSuccess && (
        <p>Password reset email sent. Check your email inbox.</p>
      )}
      {resetError && <p>Error: {resetError}</p>}
    </ForgotPasswordContainer>
  )
}

export default ForgotPassword
