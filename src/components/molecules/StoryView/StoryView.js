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
      <p>Date: {month} {day} {year}</p>
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
          <p>Story #{props.story.id}</p>
          {parseDate(props.story.created)}
          <p>Speaking from the point of view of a {pointOfView}</p>
          <p>I {knowSomeoneIncarcerated} know someone who is incarcerated</p>
          <p>Responding to the following prompt:</p>
          <p>{speakingAbout}</p>

        </div>
      </div>
    )
  }

  const audioPlayerUnselected = () => {
    return (
      <div>
        <div className='click-story-msg'>
          <p>Click a story to listen</p>
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
