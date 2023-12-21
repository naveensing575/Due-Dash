import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styled from 'styled-components'

const SignupContainer = styled.div`
  text-align: center;
`

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
`

const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`

const SignupButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`

const Signup = () => {
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSignup = async (e: any) => {
    e.preventDefault()

    // Add your form validation logic here

    try {
      const user = {
        uid: 'mockedUserId', // You might want to generate a unique ID for the user
        email: `${formData.firstName.toLowerCase()}@example.com`, // Mocked email based on the first name
        id: 'mockedUserId', // Provide a default value for id
        name: `${formData.firstName} ${formData.lastName}`, // Concatenate first and last names
      }

      // Additional steps if needed after successful signup
      signIn(user)
    } catch (error) {
      console.error('Error during signup:', error)
      // Handle signup error
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
        />
        <FormInput
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <FormInput
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <FormInput
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleInputChange}
        />
        {/* Add additional form fields as needed */}
        <SignupButton type="submit">Sign Up</SignupButton>
      </SignupForm>
    </SignupContainer>
  )
}

export default Signup
