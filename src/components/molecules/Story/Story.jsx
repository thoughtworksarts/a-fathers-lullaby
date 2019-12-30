import React from 'react'
import classNames from 'classnames'
import './Story.css'

const Story = ({ isPlaying, clickHandler, story, arrayIndex }) => {
  const minutes = Math.floor(story.audio_length_in_seconds / 60)
  const seconds = Math.trunc(story.audio_length_in_seconds - (minutes * 60))

  return (
    <tr className={classNames({ playing: isPlaying }, 'Story')} onClick={() => clickHandler(story)}>
      <td width='10%'>{arrayIndex}</td>
      <td width='10%'>Story {arrayIndex}</td>
      <td width='10%'>{minutes}:{seconds < 10 ? '0' + seconds : seconds}</td>
    </tr>
  )
}

export default Story
