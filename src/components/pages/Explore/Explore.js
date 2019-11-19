import React, { useEffect, useState } from 'react'
import { MapContainer, StoryPlaylist } from 'organisms'
import './Explore.css'

const Explore = () => {
  const [stories, setStories] = useState([])
  const [curStory, setCurStory] = useState([])

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

  const callbackFunction = (newCurStory) => {
    setCurStory(newCurStory)
    console.log(newCurStory)
  }

  return (
    <div className='ExplorePage'>
      <div>
        <MapContainer stories={stories} parentCallback={callbackFunction} />
      </div>
      <div className='ExplorePlaylistContainer'>
        <StoryPlaylist className='ExplorePlaylist' stories={stories} curStory={curStory} />
      </div>
    </div>
  )
}

export default Explore
