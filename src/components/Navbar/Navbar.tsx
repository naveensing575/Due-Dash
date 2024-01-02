import React from 'react'
import styled from 'styled-components'
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown'

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`

const AppName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
`

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <AppName>Due-Dash</AppName>
      <ProfileDropdown />
    </NavbarContainer>
  )
}

export default Navbar
