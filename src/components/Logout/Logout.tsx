import React from 'react'
import { useAuth } from '../../context/AuthContext'
import styled from 'styled-components'
import { useNavigate } from 'react-router'

const StyledLogoutButton = styled.button`
  background-color: #d32f2f;
  color: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`

const LogoutButton: React.FC = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    navigate('/login')
    console.log('Logout successful')
  }

  return <StyledLogoutButton onClick={handleLogout}>Logout</StyledLogoutButton>
}

export default LogoutButton
