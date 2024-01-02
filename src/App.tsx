import React from 'react'
import Root from './routes'
import BackgroundContainer from './components/Background/BackgroundContainer'
import Navbar from './components/Navbar/Navbar'
import { useAuth } from './context/AuthContext'

const App: React.FC = () => {
  const { user } = useAuth()

  return (
    <BackgroundContainer>
      {user && <Navbar />}
      <Root />
    </BackgroundContainer>
  )
}

export default App
