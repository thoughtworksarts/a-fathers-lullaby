import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapContainer, StoryPlaylist } from 'organisms'
import './Explore.css'

const Explore = () => {
  const [stories, setStories] = useState([])
  const [tags, setTags] = useState([])
  const [currentStory, setCurrentStory] = useState('')

  const { id } = useParams()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ASSETS_URL}`, {
      headers: {
        authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(stories => {
        setStories(stories)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_TAGS_URL}`, {
      headers: {
        authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(tags => {
        setTags(tags)
      })
      .catch(err => console.log(err))
  }, [])

  const updateCurrentStory = (newCurrentStory) => {
    setCurrentStory(newCurrentStory)
  }

  return (
    <div className='ExplorePage'>
      <div>
        <MapContainer stories={stories} currentStory={currentStory} parentCallback={updateCurrentStory} tags={tags} />
      </div>
      <div className='ExplorePlaylistContainer'>
        <StoryPlaylist className='ExplorePlaylist' stories={stories} id={id} currentStory={currentStory} updateCurrentStory={updateCurrentStory} />
      </div>
    </div>
  )
}

export default Explore
