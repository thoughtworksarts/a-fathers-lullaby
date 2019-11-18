import React, { useState, useEffect } from 'react'
import { Story } from 'molecules'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import ReactAudioPlayer from 'react-audio-player'
import numberIcon from 'assets/hashtag-solid.svg'
import clockIcon from 'assets/clock-regular.svg'
import './StoryPlaylist.css'

const StoryPlaylist = (props) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState('')
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentFilename, setCurrentFilename] = useState('')
  const [storyNotFound, setStoryNotFound] = useState(true)

  useEffect(() => {
    if (props.id) {
      for (let i = 0; i < props.stories.length; i++) {
        console.log(props.id)
        if (props.stories[i].id === Number(props.id)) {
          setStoryNotFound(false)
          playStoryByID()
          break
        } else {
          setStoryNotFound(true)
        }
      }
    }
  }, [props.stories])

  function playStoryByID () {
    let index = null

    if (props.stories && props.stories.length) {
      index = props.stories.findIndex(story => { return story.id === Number(props.id) })

      setCurrentStoryIndex(index)
      setCurrentTitle('Story ' + props.id)
      setCurrentFilename(props.stories[index].filename)

      const storyArray = removePlayingClassFromStories()

      addPlayingClassToStory(storyArray, index)

      document.querySelector('.playing').scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      })
    }
  }

  function removePlayingClassFromStories () {
    const storyArray = document.getElementsByClassName('Story')
    for (let i = 0; i < storyArray.length; i++) {
      storyArray[i].classList.remove('playing')
    }
    return storyArray
  }

  function addPlayingClassToStory (storyArray, index) {
    const curStory = storyArray[index]
    curStory.classList.add('playing')
  }

  const clickHandler = (index, title, filename) => {
    const storyArray = removePlayingClassFromStories()

    setCurrentStoryIndex(index)
    setCurrentTitle(title)
    setCurrentFilename(filename)

    addPlayingClassToStory(storyArray, index)
  }

  // TODO: Change to story id if it's possible to update the current ids to start at 1
  let listNumber = 0

  const endHandler = () => {
    const nextStoryIndex = currentStoryIndex + 1

    if (nextStoryIndex === props.stories.length) {
      return null
    } else {
      setCurrentStoryIndex(nextStoryIndex)
      setCurrentTitle('Story ' + props.stories[nextStoryIndex].id)
      setCurrentFilename(props.stories[nextStoryIndex].filename)

      const storyArray = removePlayingClassFromStories()

      addPlayingClassToStory(storyArray, nextStoryIndex)
    }
  }

  const storiesTable = (
    <div>
      {props.id !== null && storyNotFound ? <Alert variant='danger'>Not found</Alert> : null}
      <div className='audio-player'>
        <p className='current-title'>{currentTitle}</p>
        <ReactAudioPlayer
          src={process.env.REACT_APP_ROUNDWARE_PROD + currentFilename}
          controls
          autoPlay
          onEnded={endHandler}
        />
      </div>
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
            listNumber += 1
            return <Story key={story.id} story={story} listNumber={listNumber} clickHandler={clickHandler} />
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
