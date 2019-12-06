import React, { useState, useEffect } from 'react'
import { Recorder, ParticipateForm, ShareLocation } from 'organisms'
import './Share.css'

const Share = () => {
  const [recordedStoryURL, setRecordedStoryURL] = useState('')
  const [latitude, setLatitude] = useState(1.0)
  const [longitude, setLongitude] = useState(1.0)
  const [tags] = useState('')

  const updateRecordedStoryURL = (blobURL) => {
    setRecordedStoryURL(blobURL)
  }

  const updateLatAndLong = (latitude, longitude) => {
    setLatitude(latitude)
    setLongitude(longitude)
    console.log('latitude: ' + latitude)
    console.log('longitude: ' + longitude)
  }

  useEffect(() => {
    if (!recordedStoryURL) return

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

    /**
    * Step 2:
    * Create a new envelope
    * POST localhost:8888/api/2/envelopes/
    * Save the id returned
    */
    const createEnvelopeAndReturnId = (sessionId) =>
      fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ENVELOPES_URL}`, {
        method: 'POST',
        headers: {
          authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`,
          'content-type': 'application/json'
        },
        processData: false,
        body: '{"session_id": ' + sessionId.toString() + '}'
      }).then(res => res.json())
        .then((res) => res.id)

    /**
     * Step 3:
     * Gather all the info and create a new Formdata class
     *
     */
    const createFormData = (envelopeId) => {
      return fetch(recordedStoryURL)
        .then(r => r.blob())
        .then(blob => blob.arrayBuffer())
        .then(buffer => {
          const formData = new FormData()

          formData.append('latitude', latitude)
          formData.append('longitude', longitude)
          formData.append('file', buffer)
          formData.append('tag_ids', tags)
          formData.append('envelope_id', envelopeId)
          return formData
        })
    }

    /**
    * Step 4:
    * Update Envelope with Asset
    *
    * PATCH localhost:8888/api/2/envelopes/:id/
    *
    * Validate response
    */
    const uploadAudioRecording = (formData) => {
      return fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ASSETS_URL}`
        , {
          method: 'POST',
          headers: {
            authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
          },
          mimeType: 'multipart/form-data',
          processData: false,
          contentType: false,
          body: formData

        })
    }

    getSessionId()
      .then(sessionId => createEnvelopeAndReturnId(sessionId))
      .then(envelopeId => createFormData(envelopeId))
      .then(form => {
        console.log('file: ' + form.get('file'))
        return uploadAudioRecording(form)
      })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then((res) => console.log(res))
      .catch(err => console.log(err))
  }, [recordedStoryURL, latitude, longitude, tags])

  return (

    <div className='SharePage'>
      {(recordedStoryURL !== '') ? <p>Recorded Story blob URL: {recordedStoryURL}</p> : <p>No recording</p>}

      <div className='recordingTitle'>
          When you share your story you become a part of this poetic movement. You give a voice to the call for social change.
      </div>

      <div className='shareLocation'>
        <ShareLocation parentCallback={updateLatAndLong} />
      </div>

      <div className='participateForm'>
        <ParticipateForm />
      </div>

      <div className='container'>
        <Recorder parentCallback={updateRecordedStoryURL} />
      </div>

    </div>
  )
}

export default Share
