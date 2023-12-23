import React from 'react'
import styled from 'styled-components'
import { videoLink } from '../../config/logoLinks'

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

const VideoBackground = () => {
  return (
    <VideoContainer>
      <video autoPlay loop muted playsInline>
        <source src={videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  )
}

export default VideoBackground
