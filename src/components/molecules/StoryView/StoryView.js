import React from 'react'
import './StoryView.css'

const StoryView = props => {
  let parentOrChild = ''
  let knowIncarcerated = ''
  let topic = ''

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
    console.log("props.tag", props.tags)
    console.log("props.story.tag_ids", props.story.tag_ids)
    console.log("currentStory", props.story)

    props.story.tag_ids.forEach((currentStoryTag) => {
      // console.log("currentStoryTag", currentStoryTag)
      props.tags.forEach((tagFromDatabase) => {
        // console.log("tagFromDatabase", tagFromDatabase.id)
        if(currentStoryTag === tagFromDatabase.id){
          console.log(tagFromDatabase.value)
          // console.log(" equal to ")
          // console.log(tagFromDatabase.id)
        }
      })
    })
    
    
    return (
      <div>
        <div className='story-meta-data'>
          <h3>Story # {props.story.id}</h3>
          <h3>Date: {parseDate(props.story.created)}</h3>
          <h3></h3>
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
