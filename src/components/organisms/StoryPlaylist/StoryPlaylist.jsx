import React, { useState, useEffect } from 'react'
import { Story, StoryPlayer } from 'molecules'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import numberIcon from 'assets/hashtag-solid.svg'
import clockIcon from 'assets/clock-regular.svg'
import './StoryPlaylist.scss'

const StoryPlaylist = ({ stories, id, currentStory = {}, goToStory }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [storyNotFound, setStoryNotFound] = useState(false)
  // const [prevStoryIndex, setPrevStoryIndex] = useState(null)

  const endHandler = () => {
    const nextStoryIndex = currentStoryIndex + 1
    goToStory(stories[nextStoryIndex].id)
  }

  useEffect(() => {
    const index = stories.findIndex(story => story.id === Number(currentStory.id))
    setCurrentStoryIndex(index)
    // setPrevStoryIndex(currentStoryIndex) // eslint-disable-next-line
  }, [stories, currentStory])

  useEffect(() => {
    if (id) {
      for (let i = 0; i < stories.length; i++) {
        if (stories[i].id === Number(id)) {
          setStoryNotFound(false)
          const arrayIndex = stories.findIndex(story => story.id === Number(id))

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

  const storiesTable = (
    <div>
      {id !== null && storyNotFound && <Alert variant='danger'>Not found</Alert>}
      <StoryPlayer
        src={currentStory ? (process.env.REACT_APP_ROUNDWARE_PROD + currentStory.filename) : null}
        title={currentStory ? `Story ${(stories.indexOf(currentStory) + 1)}` : ''}
        endHandler={endHandler}
      />
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
            return (
              <Story
                key={story.id}
                story={story}
                isPlaying={story.id === currentStory.id}
                arrayIndex={stories.indexOf(story) + 1}
                clickHandler={() => goToStory(story.id)}
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
