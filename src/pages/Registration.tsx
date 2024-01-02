import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { registerUser } from '../services/firestoreService'

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

const ErrorTooltip = styled.div`
  color: #ff1744;
  font-size: 14px;
`

const validationSchema = Yup.object({
  phoneNumber: Yup.string().required('Phone Number is required'),
  dob: Yup.string().required('Date of Birth is required'),
})

const Registration = () => {
  const { user: authUser, signIn, signOut } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstName: authUser?.name.split(' ')[0] || '',
      lastName: authUser?.name.split(' ')[1] || '',
      phoneNumber: '',
      dob: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true)

        const userData = {
          uid: authUser?.id ?? '',
          email: `${values.firstName.toLowerCase()}@example.com`,
          id: authUser?.id ?? '',
          name: `${values.firstName} ${values.lastName}`,
          phoneNumber: values.phoneNumber,
          dob: values.dob,
        }

        signIn(userData)

        await registerUser({
          uid: userData.uid,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          dob: values.dob,
        })

        resetForm()
        navigate('/dashboard')
      } catch (error) {
        console.error('Error during signup:', error)
      } finally {
        setSubmitting(false)
      }
    },
  })
  return (
    <SignupContainer>
      <h2>Create an Account</h2>
      <SignupForm onSubmit={formik.handleSubmit}>
        <FormInput
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <ErrorTooltip>{formik.errors.firstName}</ErrorTooltip>
        )}

        <FormInput
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <ErrorTooltip>{formik.errors.lastName}</ErrorTooltip>
        )}

        <FormInput
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <ErrorTooltip>{formik.errors.phoneNumber}</ErrorTooltip>
        )}

        <FormInput
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formik.values.dob}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.dob && formik.errors.dob && (
          <ErrorTooltip>{formik.errors.dob}</ErrorTooltip>
        )}

        <SignupButton type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </SignupButton>
      </SignupForm>
      {formik.isSubmitting && <div>Signing up...</div>}
    </SignupContainer>
  )
}

export default Registration
