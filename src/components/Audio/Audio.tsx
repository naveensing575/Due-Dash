import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import AudioTrack from '../../assets/bgAudio.mp3'
import icon from '../../assets/audioIcon.png'

const AudioControls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 1000;
`

const PlayPauseButton = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  padding: 8px;
  margin-left: 8px;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
`

const waveAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 100% 0; }
`

const PlayPauseIcon = styled.div<{ isPlaying: boolean }>`
  width: 20px;
  height: 20px;
  background: url(${icon});
  background-size: 200% 100%;
  display: block;
  ${({ isPlaying }) =>
    isPlaying &&
    css`
      animation: ${waveAnimation} 1s linear infinite;
    `};
`

const BackgroundAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState(new Audio(AudioTrack))

  useEffect(() => {
    const playPauseHandler = () => {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying(!isPlaying)
    }

    const button = document.getElementById('play-pause-button')
    button?.addEventListener('click', playPauseHandler)

    return () => {
      button?.removeEventListener('click', playPauseHandler)
    }
  }, [isPlaying, audioElement])

  return (
    <AudioControls>
      <PlayPauseButton id="play-pause-button">
        <PlayPauseIcon isPlaying={isPlaying} />
      </PlayPauseButton>
    </AudioControls>
  )
}

export default BackgroundAudio
