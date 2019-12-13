import React from 'react'
import './StoryView.css'

let month
let day
let year

const StoryView = props => {
  let speakingAbout

  const parseDate = (created) => {
    month = created.substring(5, 7)
    day = created.substring(8, 10)
    year = created.substring(0, 4)
  }

  const audioPlayerSelected = () => {
    const minutes = Math.floor(props.story.audio_length_in_seconds / 60)
    const seconds = Math.trunc(props.story.audio_length_in_seconds - (minutes * 60))
    parseDate(props.story.created)
    props.story.tag_ids.forEach((currentStoryTag) => {
      if (currentStoryTag === 273) {
        speakingAbout = 'Sing a lullaby or song that reminds you of childhood.'
      } else if (currentStoryTag === 277) {
        speakingAbout = 'What is the impact of missing fathers on the community and children left behind?'
      } else if (currentStoryTag === 276) {
        speakingAbout = 'What does it mean for a father to be present for his child?'
      } else if (currentStoryTag === 272) {
        speakingAbout = 'Share a memory or life story related to a lullaby.'
      } else if (currentStoryTag === 280) {
        speakingAbout = 'What needs to change?'
      }
    })

    return (
      <div className='story-meta-data'>
        <div className='current-story-title'>
          <h2>Story #{props.arrayIndex} of {props.length}</h2>
        </div>
        <div className='story-info'>
          Responding to the following prompt:
          <br />
          {speakingAbout}
        </div>
        <div className='story-info'>
          Duration: {minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </div>
        <div className='story-info'>
          Recorded on {month}/{day}/{year}
        </div>
        <div className='story-info'>
          Link to share: http://localhost:3000/explore/{props.story.id}
        </div>
      </div>
    )
  }

  const audioPlayerUnselected = () => {
    return (
      <div className='click-msg'>
        Click a story to listen
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
