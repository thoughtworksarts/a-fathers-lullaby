import React from 'react'
import './Story.css'

const Story = props => {
  const minutes = Math.floor(props.story.audio_length_in_seconds / 60)
  const seconds = Math.trunc(props.story.audio_length_in_seconds - (minutes * 60))
  const index = props.listNumber - 1
  const title = 'Story ' + props.story.id
  const filename = props.story.filename

  return (
    <tr className='Story' onClick={() => props.clickHandler(index, title, filename)}>
      <td width='10%'>{props.listNumber}</td>
      <td width='10%'>Story {props.story.id}</td>
      {/* TODO: Change location to reflect story latitude and longitude with a geocoding API */}
      <td width='10%'>Boston, MA</td>
      <td width='10%'>{minutes}:{seconds < 10 ? '0' + seconds : seconds}</td>
    </tr>
  )
}

export default Story