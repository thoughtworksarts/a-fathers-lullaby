import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapContainer, StoryPlaylist } from 'organisms'
import { Row, Col, Container } from 'react-bootstrap'

import './Explore.css'

const Explore = () => {
  const [stories, setStories] = useState([])
  const [tags, setTags] = useState([])
  const [currentStory, setCurrentStory] = useState('')
  const [latitude] = useState('42.3601')
  const [longitude] = useState('-71.05')
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

  // create a stream for the first render
  const playStream = () => {
    getSessionId()
      .then(sessionId => createStream(sessionId))
  }

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

  const getSessionId = () => {
    const nav = window.navigator.userAgent
    const form = '{"project_id": 1,"client_system": "' + nav.substring(0, 127) + '"}'

    return fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_SESSIONS_URL}`, {
      method: 'POST',
      headers: {
        authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`,
        'content-type': 'application/json'
      },
      processData: false,
      body: form
    }).then(res => res.json())
      .then((res) => {
        const sessionId = res.id
        return sessionId
      })
  }

  const createStream = (sessionId) => {
    const formData = new FormData()
    formData.append('session_id', sessionId.toString())
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)

    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_STREAMS_URL}`,
      {
        method: 'POST',
        headers: {
          authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
        },
        mimeType: 'multipart/form-data',
        processData: false,
        contentType: false,
        body: formData
      })
      .then(res => {
        console.log(res.json())
      })
      .catch(err => console.log(err))
  }

  const updateCurrentStory = (newCurrentStory) => {
    setCurrentStory(newCurrentStory)
  }

  return (
    <Container className='explore-page'>
      <Row>
        <Col lg={12}>
          <MapContainer stories={stories} currentStory={currentStory} parentCallback={updateCurrentStory} tags={tags} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <StoryPlaylist className='ExplorePlaylist' stories={stories} id={id} currentStory={currentStory} updateCurrentStory={updateCurrentStory} />
        </Col>
      </Row>
    </Container>
  )
}

export default Explore
