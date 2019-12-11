import React from 'react'
import './Story.css'

const Story = props => {
  const minutes = Math.floor(props.story.audio_length_in_seconds / 60)
  const seconds = Math.trunc(props.story.audio_length_in_seconds - (minutes * 60))

  return (
    <tr className='Story' onClick={() => props.clickHandler(props.story)}>
      <td width='10%'>{props.arrayIndex}</td>
      <td width='10%'>Story {props.arrayIndex}</td>
      <td width='10%'>{minutes}:{seconds < 10 ? '0' + seconds : seconds}</td>
    </tr>
  )
}

export default Story
