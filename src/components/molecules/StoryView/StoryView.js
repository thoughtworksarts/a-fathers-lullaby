import React from 'react'
import './StoryView.css'

const StoryView = props => {
  let pointOfView
  let knowSomeoneIncarcerated
  let speakingAbout

  const parseDate = (created) => {
    const month = created.substring(5, 7)
    const day = created.substring(8, 10)
    const year = created.substring(0, 4)
    return (
      <h3>Date: {month} {day} {year}</h3>
    )
  }

  const audioPlayerSelected = () => {
    props.story.tag_ids.forEach((currentStoryTag) => {
      if (currentStoryTag === 275) {
        pointOfView = 'child'
      } else if (currentStoryTag === 274) {
        pointOfView = 'parent'
      }

      if (currentStoryTag === 278) {
        knowSomeoneIncarcerated = 'do'
      } else if (currentStoryTag === 279) {
        knowSomeoneIncarcerated = 'do not'
      }

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
      <div>
        <div className='story-meta-data'>
          <h3>Story #{props.story.id}</h3>
          {parseDate(props.story.created)}
          <h3>Speaking from the point of view of a {pointOfView}</h3>
          <h3>I {knowSomeoneIncarcerated} know someone who is incarcerated</h3>
          <h3>Responding to the following prompt:</h3>
          <h3>{speakingAbout}</h3>

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
