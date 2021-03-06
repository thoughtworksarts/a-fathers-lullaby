import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { MapContainer, StoryPlaylist } from 'organisms'
import { Row, Col, Container } from 'react-bootstrap'
import './Explore.css'

const Explore = () => {
  const displayPlayStream = false
  const [stories, setStories] = useState([])
  const [currentStory, setCurrentStory] = useState('')
  const [storyNotFound, setStoryNotFound] = useState(false)
  const [tags, setTags] = useState([])
  const [latitude] = useState('42.3601')
  const [longitude] = useState('-71.05')
  const [mp3URL, setMp3URL] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ASSETS_URL}`,
      {
        headers: {
          authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
        }
      }
    )
      .then(res => res.json())
      .then(stories => {
        setStories(stories)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (params.id && stories.length > 0) {
      const newStory = stories.find(({ id }) => id === Number(params.id))

      if (!newStory) {
        setStoryNotFound(true)
        return
      }

      const index = stories.findIndex(story => story.id === newStory.id)
      const storyWithIndex = Object.assign(newStory, { index })
      setStoryNotFound(false)
      setCurrentStory(storyWithIndex)
    }
  }, [stories, params.id])

  const goToStory = id => history.push(`/explore/${id}`)

  const playStream = () => {
    if (!isPlaying && !mp3URL) {
      getSessionId()
        .then(sessionId => createFormData(sessionId))
        .then(formData => createStream(formData))
        .then(res => {
          setMp3URL(res.stream_url)
        })
        .then(() => {
          document.getElementById('streamplayer').play()
        })
    } else if (!isPlaying) {
      document.getElementById('streamplayer').play()
    } else {
      document.getElementById('streamplayer').pause()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_TAGS_URL}`,
      {
        headers: {
          authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
        }
      }
    )
      .then(res => res.json())
      .then(tags => {
        setTags(tags)
      })
      .catch(err => console.log(err))
  }, [])

  const getSessionId = () => {
    const nav = window.navigator.userAgent
    const form =
      '{"project_id": 25,"client_system": "' + nav.substring(0, 127) + '"}'

    return fetch(
      `${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_SESSIONS_URL}`,
      {
        method: 'POST',
        headers: {
          authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`,
          'content-type': 'application/json'
        },
        processData: false,
        body: form
      }
    )
      .then(res => res.json())
      .then(res => {
        const sessionId = res.id
        return sessionId
      })
  }

  const createFormData = sessionId => {
    const formData = new FormData()
    formData.append('session_id', sessionId.toString())
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)

    return formData
  }

  const createStream = formData => {
    return fetch(
      `${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_STREAMS_URL}`,
      {
        method: 'POST',
        headers: {
          authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
        },
        mimeType: 'multipart/form-data',
        processData: false,
        contentType: false,
        body: formData
      }
    )
      .then(res => {
        return res.json()
      })
      .catch(err => console.log(err))
  }

  return (
    <Container className='explore-page'>
      {displayPlayStream ? (
        <Row>
          <Col lg={12}>
            <button className='Button' onClick={playStream}>
              {isPlaying ? 'Pause Stream' : 'Play Stream'}
              <audio key={mp3URL} id='streamplayer'>
                <source id='audiosource' type='audio/mp3' src={mp3URL} />
              </audio>
            </button>
          </Col>
        </Row>
      ) : (
        <div />
      )}
      <Row>
        <Col lg={12}>
          <MapContainer
            stories={stories}
            currentStory={currentStory}
            goToStory={goToStory}
            tags={tags}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <StoryPlaylist
            className='ExplorePlaylist'
            stories={stories}
            currentStory={currentStory}
            goToStory={goToStory}
            storyNotFound={storyNotFound}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Explore
