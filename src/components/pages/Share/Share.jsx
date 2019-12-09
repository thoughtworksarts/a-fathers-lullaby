import React, { useState, useEffect } from 'react'
import { Recorder, ParticipateForm, ShareLocation } from 'organisms'
import './Share.css'

const Share = () => {
  const [recordedStoryURL, setRecordedStoryURL] = useState('')
  const [latitude, setLatitude] = useState(42.34)
  const [longitude, setLongitude] = useState(-71.04)

  // Tags
  const [perspective, setPerspective] = useState('')
  const [relationship, setRelationship] = useState('')
  const [prompt, setPrompt] = useState('')

  const updateRecordedStoryURL = (blobURL) => {
    setRecordedStoryURL(blobURL)
  }

  const updateLatAndLong = (latitude, longitude) => {
    setLatitude(latitude)
    setLongitude(longitude)
    console.log('Latitude: ' + latitude)
    console.log('Longitude: ' + longitude)
  }

  const updatePerspective = (newPerspective) => {
    setPerspective(newPerspective)
    console.log('Perspective: ' + perspective)
  }

  const updateRelationship = (newRelationship) => {
    setRelationship(newRelationship)
    console.log('Relationship: ' + relationship)
  }

  const updatePrompt = (newPrompt) => {
    setPrompt(newPrompt)
    console.log('Prompt: ' + prompt)
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
          formData.append('tag_ids', perspective + ',' + relationship + ',' + prompt)
          formData.append('envelope_id', envelopeId)
          console.log(formData)

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

    // To do:
    // 1. Test Internal Server by using Postman to do a PATCH envelope and POST test asset 
    // 2. Change BlobURL Buffer array --> make sure it's actually the audio in correct format
    // 3. Make sure coordinates are going in project's accepted lat and longitude 

    getSessionId()
      .then(sessionId => createEnvelopeAndReturnId(sessionId))
      .then(envelopeId => createFormData(envelopeId))
      .then(formData => {
        console.log('file: ' + formData.get('file'))
        return uploadAudioRecording(formData)
      })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then((res) => console.log(res))
      .catch(err => console.log(err))
  }, [recordedStoryURL, latitude, longitude, perspective, relationship, prompt])

  return (
    <div className='SharePage'>
      <div className='recordingTitle'>
          When you share your story you become a part of this poetic movement. You give a voice to the call for social change.
      </div>
      <div className='shareLocation'>
        <ShareLocation parentCallback={updateLatAndLong} />
      </div>
      <div className='participateForm'>
        <ParticipateForm updatePerspective={updatePerspective} updateRelationship={updateRelationship} updatePrompt={updatePrompt}/>
      </div>
      <div className='container'>
        <Recorder parentCallback={updateRecordedStoryURL} />
      </div>
    </div>
  )
}

export default Share
