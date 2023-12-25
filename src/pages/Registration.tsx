import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styled from 'styled-components'
import { useNavigate } from 'react-router'

const SignupContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  color: #fff;
  font-family: Anton, sans-serif;
`

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
`

const FormInput = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`

const SignupButton = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367d6;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

interface FeedbackMessageProps {
  success: boolean
}

const FeedbackMessage = styled.div<FeedbackMessageProps>`
  margin-top: 10px;
  color: ${(props) => (props.success ? '#4caf50' : '#ff1744')};
`

const Registration = () => {
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
  })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ message: '', success: false })

  const navigate = useNavigate()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Add your form validation logic here

    try {
      setLoading(true)

      // Simulating an asynchronous signup process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = {
        uid: 'mockedUserId', // You might want to generate a unique ID for the user
        email: `${formData.firstName.toLowerCase()}@example.com`, // Mocked email based on the first name
        id: 'mockedUserId', // Provide a default value for id
        name: `${formData.firstName} ${formData.lastName}`, // Concatenate first and last names
      }

      // Additional steps if needed after successful signup
      signIn(user)

      setFeedback({ message: 'Signup successful!', success: true })

      // Reset form fields
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dob: '',
      })

      navigate('/dashboard')
    } catch (error) {
      console.error('Error during signup:', error)
      setFeedback({
        message: 'Error during signup. Please try again.',
        success: false,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SignupContainer>
      <h2>Create an Account</h2>
      <SignupForm onSubmit={handleSignup}>
        <FormInput
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <FormInput
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <FormInput
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <FormInput
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        <SignupButton type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </SignupButton>
      </SignupForm>
      {feedback.message && (
        <FeedbackMessage success={feedback.success}>
          {feedback.message}
        </FeedbackMessage>
      )}
    </SignupContainer>
  )
}

export default Registration
