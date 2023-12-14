import React, { useState } from 'react'
import styled from 'styled-components'

interface ProfileDropdownProps {
  profile: {
    picture: string
    name: string
    email: string
  }
  onLogout: () => void
}

const Container = styled.div`
  position: relative;
  text-align: right;
`

const DropdownContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: light-blue;
  backdrop-filter: blur(10px);
  border: 1px solid silver;
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
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

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  profile,
  onLogout,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <Container>
      <ProfileImage
        src={profile.picture}
        alt="user image"
        onClick={toggleDropdown}
      />
      {showDropdown && (
        <DropdownContainer>
          <DropdownContent>
            <p>{profile.name}</p>
            <p>{profile.email}</p>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </DropdownContent>
        </DropdownContainer>
      )}
    </Container>
  )
}

export default ProfileDropdown
