import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import './StoryView.css'

const StoryView = props => {
  const parseDate = (created) => {
    const month = created.substring(5, 7)
    const day = created.substring(8, 10)
    const year = created.substring(0, 4)
    console.log('string', created)
    console.log(month)
    console.log(day)
    console.log(year)
    return (
      <div>
        <p>{month} {day} {year}</p>
      </div>
    )
  }

  const audioPlayerSelected = () => {
    return (
      <div className='audio-player'>
        <h3>Story # {props.story.id}</h3>
        <h3>Date: {parseDate(props.story.created)}</h3>

        <ReactAudioPlayer
          src={process.env.REACT_APP_ROUNDWARE_PROD + props.story.filename}
          controls
          autoPlay
        />
      </div>
    )
  }

  const audioPlayerUnselected = () => {
    return (
      <div className='audio-player'>
        <h3 className='click-story-msg'>
      Click a story to listen
        </h3>
        <ReactAudioPlayer
          controls
          autoPlay
        />
      </div>
    )
  }

  return (
    <div className='StoryView'>
      {
        props.story
          ? audioPlayerSelected()
          : audioPlayerUnselected()
      }
    </div>
  )
}

export default StoryView
