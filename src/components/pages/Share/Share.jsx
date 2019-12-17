import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Recorder, ParticipateForm, ShareLocation } from 'organisms'
import { Row, Col, Container } from 'react-bootstrap'
import './Share.css'

const Share = () => {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [perspective, setPerspective] = useState('')
  const [relationship, setRelationship] = useState('')
  const [prompt, setPrompt] = useState('')
  const [myErrors, setErrors] = useState([])

  const [uploading, setUploading] = useState(false)
  const [newLullabyId, setNewLullabyId] = useState('')

  const updateLatAndLong = (latitude, longitude) => {
    setLatitude(latitude)
    setLongitude(longitude)
  }

  const updatePerspective = (newPerspective) => {
    setPerspective(newPerspective)
  }

  const updateRelationship = (newRelationship) => {
    setRelationship(newRelationship)
  }

  const updatePrompt = (newPrompt) => {
    setPrompt(newPrompt)
  }

  const uploadStory = (blob) => {
    setUploading(true)
    setErrors([])

    if (!perspective || !relationship || !prompt || !latitude) {
      if (!perspective) {
        setErrors(myErrors => [...myErrors, 'perspective'])
      }
      if (!relationship) {
        setErrors(myErrors => [...myErrors, 'relationship'])
      }
      if (!prompt) {
        setErrors(myErrors => [...myErrors, 'prompt'])
      }
      if (!latitude) {
        setErrors(myErrors => [...myErrors, 'location'])
      }
    } else {
      getSessionId()
        .then(sessionId => createEnvelopeAndReturnId(sessionId))
        .then(ids => createFormData(ids.envelopeId, ids.sessionId, blob))
        .then(data => uploadAudioRecording(data.form, data.envelopeId))
        .then(resId => {
          setNewLullabyId(resId)
        })
        .catch(err => console.log(err))
    }
  }

  /* Roundware interfaces */

  /**
   * Step 1:
   * Connect to roundware and get a session
   * POST localhost:8888/api/2/sessions/
   * Validate that we got a session throw error is none is given
   *
   * REACT_APP_SESSIONS_URL=https://prod.roundware.com/api/2/sessions/
   */
  const getSessionId = () => {
    const nav = window.navigator.userAgent
    const form = '{"project_id": 25,"client_system": "' + nav.substring(0, 127) + '"}'

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

  /**
  * Step 2:
  * Create a new envelope
  * POST localhost:8888/api/2/envelopes/
  * Save the id returned
  */
  const createEnvelopeAndReturnId = (sessionId) =>
    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ENVELOPES_URL}/`, {
      method: 'POST',
      headers: {
        authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`,
        'content-type': 'application/json'
      },
      processData: false,
      body: '{"session_id": ' + sessionId.toString() + '}'
    }).then(res => res.json())
      .then((res) => { return { envelopeId: res.id, sessionId: sessionId } })

  /**
   * Step 3:
   * Gather all the info and create a new Formdata class
   *
   */
  const createFormData = (envelopeId, sessionId, blob) => {
    const formData = new FormData()
    formData.append('latitude', latitude.toString())
    formData.append('longitude', longitude.toString())
    formData.append('tag_ids', perspective + ',' + relationship + ',' + prompt)
    formData.append('file', blob)
    formData.append('session_id', sessionId.toString())
    formData.append('project_id', '25')
    formData.append('media_type', 'audio')

    return { form: formData, envelopeId: envelopeId }
  }

  /**
  * Step 4:
  * Update Envelope with Asset
  *
  * Validate response
  */
  const uploadAudioRecording = (formData, envelopeId) => {
    return fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ENVELOPES_URL}${envelopeId}/`,
      {
        method: 'PATCH',
        headers: {
          authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
        },
        mimeType: 'multipart/form-data',
        processData: false,
        contentType: false,
        body: formData
      })
      .then(res => {
        if (res.status === 200) {
          setUploading(false)
          alert('Lullaby successfully uploaded!')
        } else {
          alert('There was an error with your upload.')
        }
        return res.json()
      })
      .then(res => {
        return res.id
      })
  }

  const errors = (
    <div className='errors'>
      Error
      <ul>
        {(myErrors.map(element => { return <li key={element}>Your {element} is required</li> }))}
      </ul>
    </div>
  )

  if (newLullabyId !== '') {
    alert('Here is a link to your lullaby: https:/thoughtworksarts.io/a-fathers-lullaby/explore/' + newLullabyId)
    return <Redirect to={'/explore/' + newLullabyId} />
  }

  return (
    <Container className='SharePage'>
      <Row>
        <Col sm={12}>
          <div className='recordingTitle'>
            When you share your story you become a part of this poetic movement. You give a voice to the call for social change.
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {
            myErrors.length
              ? errors
              : <div />
          }
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <ShareLocation parentCallback={updateLatAndLong} />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <ParticipateForm updatePerspective={updatePerspective} updateRelationship={updateRelationship} updatePrompt={updatePrompt} />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {
            (uploading === false)
              ? <Recorder parentCallback={uploadStory} uploading={false} />
              : <Recorder parentCallback={uploadStory} uploading />
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Share
