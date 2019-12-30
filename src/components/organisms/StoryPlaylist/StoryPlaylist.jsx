import React, { useState, useEffect, useCallback } from 'react'
import { Story } from 'molecules'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import ReactAudioPlayer from 'react-audio-player'
import numberIcon from 'assets/hashtag-solid.svg'
import clockIcon from 'assets/clock-regular.svg'
import './StoryPlaylist.css'

const StoryPlaylist = ({ stories, id, currentStory, setCurrentStory }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState('')
  const [storyNotFound, setStoryNotFound] = useState(false)
  const [prevStoryIndex, setPrevStoryIndex] = useState(null)

  const endHandler = () => {
    const nextStoryIndex = currentStoryIndex + 1
    setCurrentStory(stories[nextStoryIndex])
  }

  useEffect(() => {
    setPrevStoryIndex(currentStoryIndex) // eslint-disable-next-line
  }, [currentStory])

  useEffect(() => {
    const index = stories.findIndex(story => { return story.id === Number(currentStory.id) })
    setCurrentStoryIndex(index)
  }, [stories, prevStoryIndex, currentStory.id])

  useEffect(() => {
    if (id) {
      for (let i = 0; i < stories.length; i++) {
        if (stories[i].id === Number(id)) {
          setStoryNotFound(false)
          const arrayIndex = stories.findIndex(story => { return story.id === Number(id) })

          document.getElementsByClassName('Story')[arrayIndex].scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
          })
          break
        } else {
          setStoryNotFound(true)
        }
      }
    }
  }, [stories, id])

  const setCurrentStoryPlayer = () => {
    let currentStoryPlayer
    if (currentStory !== '') {
      currentStoryPlayer =
        <div className='audio-player safari-only'>
          <p className='current-title'>{'Story ' + (stories.indexOf(currentStory) + 1)}</p>
          <ReactAudioPlayer
            src={process.env.REACT_APP_ROUNDWARE_PROD + currentStory.filename}
            controls
            autoPlay
            onEnded={endHandler}
          />
        </div>
    } else {
      currentStoryPlayer =
        <div className='audio-player safari-only'>
          <ReactAudioPlayer
            controls
            autoPlay
            onEnded={endHandler}
          />
        </div>
    }
    return currentStoryPlayer
  }

  const storiesTable = (
    <div>
      {id !== null && storyNotFound ? <Alert variant='danger'>Not found</Alert> : null}
      {setCurrentStoryPlayer()}
      <Table hover>
        <thead>
          <tr>
            <th><img src={numberIcon} className='number-icon' alt='number icon' /></th>
            <th>Title</th>
            <th><img src={clockIcon} className='clock-icon' alt='clock icon' /></th>
          </tr>
        </thead>
        <tbody>
          {stories.map(story => {
            console.log('STORY IDS: ', story.id, currentStory.id)
            return (
              <Story
                key={story.id}
                story={story}
                isPlaying={story.id === currentStory.id}
                arrayIndex={stories.indexOf(story) + 1}
                clickHandler={setCurrentStory}
              />
            )
          })}
        </tbody>
      </Table>
    </div>
  )

  return (
    <div className='StoryPlaylist'>
      {
        stories && stories.length > 0
          ? storiesTable
          : <h1 className='loading'>Loading...</h1>
      }
    </div>
  )
}

export default StoryPlaylist
