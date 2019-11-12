import React from 'react'
import './StoryView.css'

const storyView = props => {
  return (
    <div className='StoryView'>
      <h1>ID: {props.asset.id}</h1>
    </div>
  )
}

export default storyView
