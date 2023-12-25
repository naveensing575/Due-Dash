import React, { useState } from 'react'
import styled from 'styled-components'
import { videoLink } from '../../config/Links'

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Video = () => {
  const [key, setKey] = useState(0)

  const restartVideo = () => {
    // Incrementing the key will force the video to remount and restart
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <VideoContainer>
      <video key={key} autoPlay loop muted playsInline onEnded={restartVideo}>
        <source src={videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  )
}

export default Video
