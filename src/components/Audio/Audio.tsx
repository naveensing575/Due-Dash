import React, { useEffect } from 'react'
import AudioTrack from '../../assets/bgAudio.mp3'

const BackgroundAudio: React.FC = () => {
  useEffect(() => {
    const audioElement = new Audio(AudioTrack)
    audioElement.setAttribute('autoPlay', 'true')
    audioElement.setAttribute('loop', 'true')
    document.body.appendChild(audioElement)

    return () => {
      document.body.removeChild(audioElement)
    }
  }, [])

  return null // This component doesn't render anything
}

export default BackgroundAudio
