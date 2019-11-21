import React, { useState, useEffect, useCallback } from 'react'
import { Story } from 'molecules'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import ReactAudioPlayer from 'react-audio-player'
import numberIcon from 'assets/hashtag-solid.svg'
import clockIcon from 'assets/clock-regular.svg'
import './StoryPlaylist.css'

const StoryPlaylist = (props) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState('')
  const [currentStory, setCurrentStory] = useState(props.currentStory)
  const [storyNotFound, setStoryNotFound] = useState(false)
  const [prevStoryIndex, setPrevStoryIndex] = useState(null)

  const clickHandler = (story) => {
    setCurrentStory(story)
  }

  const addPlayingClassToStory = useCallback(() => {
    if ((currentStoryIndex && currentStoryIndex >= 0) || (currentStoryIndex === 0)) {
      const storyArray = document.getElementsByClassName('Story')
      storyArray[currentStoryIndex].classList.add('playing')
    }
  }, [currentStoryIndex])

  const removePlayingClassFromStory = useCallback(() => {
    if (prevStoryIndex && prevStoryIndex >= 0) {
      const storyArray = document.getElementsByClassName('Story')
      storyArray[prevStoryIndex].classList.remove('playing')
    }
  }, [prevStoryIndex])

  const endHandler = () => {
    const nextStoryIndex = currentStoryIndex + 1
    if (nextStoryIndex === props.stories.length) {
      return null
    } else {
      setCurrentStory(props.stories[nextStoryIndex])
    }
  }

  useEffect(() => {
    setCurrentStory(props.currentStory)
  }, [props.currentStory])

  useEffect(() => {
    setPrevStoryIndex(currentStoryIndex) // eslint-disable-next-line
  }, [currentStory])

  useEffect(() => {
    const index = props.stories.findIndex(story => { return story.id === Number(currentStory.id) })
    setCurrentStoryIndex(index)
  }, [props.stories, prevStoryIndex, currentStory.id])

  useEffect(() => {
    removePlayingClassFromStory()
  }, [prevStoryIndex, removePlayingClassFromStory])

  useEffect(() => {
    addPlayingClassToStory()
  }, [currentStoryIndex, addPlayingClassToStory])

  useEffect(() => {
    if (props.id) {
      for (let i = 0; i < props.stories.length; i++) {
        if (props.stories[i].id === Number(props.id)) {
          setStoryNotFound(false)
          let arrayIndex = null

          if (props.stories && props.stories.length) {
            arrayIndex = props.stories.findIndex(story => { return story.id === Number(props.id) })
            setCurrentStory(props.stories[arrayIndex])
          }

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
  }, [props.stories, props.id])

  const setCurrentStoryPlayer = () => {
    let currentStoryPlayer
    if (currentStory !== '') {
      currentStoryPlayer =
        <div className='audio-player'>
          <p className='current-title'>{'Story ' + currentStory.id}</p>
          <ReactAudioPlayer
            src={process.env.REACT_APP_ROUNDWARE_PROD + currentStory.filename}
            controls
            autoPlay
            onEnded={endHandler}
          />
        </div>
    } else {
      currentStoryPlayer =
        <div className='audio-player'>
          <ReactAudioPlayer
            controls
            autoPlay
            onEnded={endHandler}
          />
        </div>
    }
    return currentStoryPlayer
  }

  let arrayIndex = 0
  const storiesTable = (
    <div>
      {props.id !== null && storyNotFound ? <Alert variant='danger'>Not found</Alert> : null}
      {setCurrentStoryPlayer()}
      <Table hover>
        <thead>
          <tr>
            <th><img src={numberIcon} className='number-icon' alt='number icon' /></th>
            <th>Title</th>
            <th>Location</th>
            <th><img src={clockIcon} className='clock-icon' alt='clock icon' /></th>
          </tr>
        </thead>
        <tbody>
          {props.stories.map(story => {
            arrayIndex += 1
            return <Story key={story.id} story={story} arrayIndex={arrayIndex} clickHandler={clickHandler} />
          })}
        </tbody>
      </Table>
    </div>
  )

  return (
    <div className='StoryPlaylist'>
      {
        props.stories && props.stories.length > 0
          ? storiesTable
          : <h1 className='loading'>Loading...</h1>
      }
    </div>
  )
}

export default StoryPlaylist
