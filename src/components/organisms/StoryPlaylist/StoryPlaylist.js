import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Story } from 'molecules'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import ReactAudioPlayer from 'react-audio-player'
import numberIcon from 'assets/hashtag-solid.svg'
import clockIcon from 'assets/clock-regular.svg'
import './StoryPlaylist.css'

const StoryPlaylist = () => {
  const [stories, setStories] = useState([])
  const [currentStoryIndex, setCurrentStoryIndex] = useState('')
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentFilename, setCurrentFilename] = useState('')
  const [storyNotFound, setStoryNotFound] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ASSETS_URL}`, {
      headers: {
        authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(stories => {
        setStories(stories.sort((a, b) => (a.created < b.created) ? 1 : -1))

        if (id) {
          for (let i = 0; i < stories.length; i++) {
            if (stories[i].id === Number(id)) {
              setStoryNotFound(false)
              break
            } else {
              setStoryNotFound(true)
            }
          }

          const index = stories.findIndex(story => { return story.id === Number(id) })

          setCurrentStoryIndex(index)
          setCurrentTitle('Story ' + stories[index].id)
          setCurrentFilename(stories[index].filename)

          const storyArray = removePlayingClassFromStories()

          addPlayingClassToStory(storyArray, index)

          document.querySelector('.playing').scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
          })
        }
      })
      .catch(err => console.log(err))
  }, [id])

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

    if (nextStoryIndex === stories.length) {
      return null
    } else {
      setCurrentStoryIndex(nextStoryIndex)
      setCurrentTitle('Story ' + stories[nextStoryIndex].id)
      setCurrentFilename(stories[nextStoryIndex].filename)

      const storyArray = removePlayingClassFromStories()

      addPlayingClassToStory(storyArray, nextStoryIndex)
    }
  }

  const storiesTable = (
    <div>
      {storyNotFound ? <Alert variant='danger'>Not found</Alert> : null}
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
          {
            stories.map(story => {
              listNumber += 1
              return <Story key={story.id} story={story} listNumber={listNumber} clickHandler={clickHandler} />
            })
          }
        </tbody>
      </Table>
    </div>
  )

  return (
    <div className='StoryPlaylist'>
      {
        stories.length > 0
          ? storiesTable
          : <h1 className='loading'>Loading...</h1>
      }
    </div>
  )
}

export default StoryPlaylist
