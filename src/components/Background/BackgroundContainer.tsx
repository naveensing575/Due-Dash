import React from 'react'
import Video from '../Video/Video'
import Audio from '../Audio/Audio'

const BackgroundContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Video />
      <Audio />
      {children}
    </>
  )
}

export default BackgroundContainer
