import React from 'react'
import Root from './routes'
import BackgroundContainer from './components/Background/BackgroundContainer'

const App: React.FC = () => {
  return (
    <BackgroundContainer>
      <Root />
    </BackgroundContainer>
  )
}

export default App
