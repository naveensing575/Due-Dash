import React from 'react'
import Root from './routes'
import VideoBackground from './components/VideoBackground/VideoBackground'

const App: React.FC = () => {
  return (
    <>
      <VideoBackground />
      <Root />
    </>
  )
}

export default App
