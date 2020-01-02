import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import './StoryPlayer.scss'

const StoryPlayer = ({ title, src, endHandler }) => {
  return (
    <div className='audio-player safari-only'>
      {
        title && <p className='current-title'>{title}</p>
      }
      <ReactAudioPlayer
        src={src}
        controls
        autoPlay
        onEnded={endHandler}
      />
    </div>
  )
}

export default StoryPlayer
