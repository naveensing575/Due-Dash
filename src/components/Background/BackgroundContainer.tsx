import React from 'react'
import Video from '../Video/Video'

const BackgroundContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Video />
      {children}
    </>
  )
}

export default BackgroundContainer
