import React from 'react'
import LogoutButton from '../components/Logout/Logout'
import styled from 'styled-components'
import Card from '../components/CreditCard/Card'
import Inbox from './Inbox'
const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
`
const Dashboard = () => {
  return (
    <StyledDashboard>
      <h1>Welcome to Due-Dash!</h1>
      <Inbox />
    </StyledDashboard>
  )
}

export default Dashboard
