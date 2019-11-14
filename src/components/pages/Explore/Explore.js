import React, { useEffect, useState } from 'react'
import { MapContainer } from 'organisms'

import './Explore.css'

const Explore = () => {
  const [stories, setStories] = useState([])

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

  return (
    <div className='ExplorePage'>
      <MapContainer stories={stories} />
    </div>
  )
}

export default Explore
