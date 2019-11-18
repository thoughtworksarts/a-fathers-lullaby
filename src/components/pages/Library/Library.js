import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoryPlaylist } from 'organisms'
import './Library.css'

const Library = () => {
  const [stories, setStories] = useState([])
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

  return <StoryPlaylist stories={stories} id={id} />
}

export default Library
