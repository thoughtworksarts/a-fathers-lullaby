import React, { useEffect } from 'react'
import { Story, StoryPlayer } from 'molecules'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import numberIcon from 'assets/hashtag-solid.svg'
import clockIcon from 'assets/clock-regular.svg'
import './StoryPlaylist.scss'

const StoryPlaylist = ({ stories, currentStory = {}, goToStory, storyNotFound }) => {
  const endHandler = () => {
    const nextStoryIndex = currentStory.index + 1
    goToStory(stories[nextStoryIndex].id)
  }

  useEffect(() => {
    if (currentStory.index) {
      document.getElementsByClassName('Story')[currentStory.index].scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      })
    }
  }, [currentStory])

  const storiesTable = (
    <div>
      {storyNotFound && <Alert variant='danger'>Not found</Alert>}
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
