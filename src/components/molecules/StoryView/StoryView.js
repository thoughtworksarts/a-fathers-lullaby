import React from 'react'
import './StoryView.css'

const StoryView = props => {
  const parseDate = (created) => {
    const month = created.substring(5, 7)
    const day = created.substring(8, 10)
    const year = created.substring(0, 4)
    return (
      <div>
        <p>{month} {day} {year}</p>
      </div>
    )
  }

  const audioPlayerSelected = () => {
    return (
      <div>
        <div className='story-meta-data'>
          <h3>Story # {props.story.id}</h3>
          <h3>Date: {parseDate(props.story.created)}</h3>
        </div>
      </div>
    )
  }

  const audioPlayerUnselected = () => {
    return (
      <div>
        <div className='click-story-msg'>
          <h3>
          Click a story to listen
          </h3>
        </div>
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
