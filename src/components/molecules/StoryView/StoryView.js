import React from 'react'
import './StoryView.css'

let month; 
let day;
let year;


const StoryView = props => {
  let speakingAbout

  const parseDate = (created) => {
    month = created.substring(5, 7)
    day = created.substring(8, 10)
    year = created.substring(0, 4)
  }

  const audioPlayerSelected = () => {
    let minutes = Math.floor(props.story.audio_length_in_seconds / 60)
    let seconds = Math.trunc(props.story.audio_length_in_seconds - (minutes * 60))
    parseDate(props.story.created);
    console.log(props.story)
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
            Current Story Details
          </div>
          <div> 
          Story #{props.story.id}
          <br />
          Duration: {minutes}:{seconds < 10 ? '0' + seconds : seconds}
          <br />
          Recorded on {month}/{day}/{year}
          </div>
          <div> 
          Responding to the following prompt: 
          {speakingAbout}
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
