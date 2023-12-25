import React, { useEffect, useRef } from 'react'
import { audioLink } from '../../config/Links'

const Audio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          // Handle play error (e.g., autoplay policy restrictions)
          console.error('Audio play error:', error)
        })
      }
    }

    // Play audio on component mount
    playAudio()
  }, [])

  return (
    <audio ref={audioRef} loop>
      <source src={audioLink} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  )
}

export default Audio
