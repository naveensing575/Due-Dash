import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'

const Container = styled.div`
  position: relative;
  text-align: right;
`

const DropdownContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: black;
  border: 1px solid silver;
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
  color: white;
  border-radius: 20px;
  font-family: 'Poppins';
  font-size: 14px;
`

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`

const DropdownContent = styled.div`
  padding: 8px;
`

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    background-color: #c82333;
  }
`

const ProfileDropdown: React.FC = () => {
  const { user, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <Container>
      <ProfileImage
        src={user?.profilePictureUrl || ''}
        alt="user image"
        onClick={toggleDropdown}
      />
      {showDropdown && (
        <DropdownContainer>
          <DropdownContent>
            <p>{user?.fullName}</p>
            <p>{user?.email}</p>
            <LogoutButton onClick={signOut}>Logout</LogoutButton>
          </DropdownContent>
        </DropdownContainer>
      )}
    </Container>
  )
}

export default ProfileDropdown
