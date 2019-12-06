import React, { useState, useEffect } from 'react'
import { Recorder, ParticipateForm, ShareLocation } from 'organisms'
import './Share.css'

const Share = () => {
  const [recordedStory, setRecordedStory] = useState('')

  const updateRecordedStory = (blobURL) => {
    setRecordedStory(blobURL)
    console.log('Recorded Story blob URL ' + recordedStory)
  }

  useEffect(() => {
    if (!recordedStory) return

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
        .then((res) => res.id)
    }

    /**
    * Step 2:
    * Create a new envelope
    * POST localhost:8888/api/2/envelopes/
    * Save the id returned
    */
    const createEnvelope = (sessionId) =>
      fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ENVELOPES_URL}`, {
        method: 'POST',
        headers: {
          authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`,
          'content-type': 'application/json'
        },
        processData: false,
        body: '{"session_id": ' + sessionId.toString() + '}'
      })

    getSessionId()
      .then(sessionId => createEnvelope(sessionId)
      )
      .then((envelopeRes) => {
        console.log(envelopeRes.json())
      })
      .catch(err => console.log(err))

    /**
     * Step 3:
     * Gather all the info and create a new Formdata class
     *
     */

    /**
    * Step 4:
    * Update Envelope with Asset
    *
    * PATCH localhost:8888/api/2/envelopes/:id/
    *
    * Validate response
    */
  }, [recordedStory])

  return (

    <div className='SharePage'>
      {(recordedStory !== '') ? <p>Recorded Story blob URL: {recordedStory}</p> : <p>No recording</p>}

      <div className='recordingTitle'>
          When you share your story you become a part of this poetic movement. You give a voice to the call for social change.
      </div>

      <div className='shareLocation'>
        <ShareLocation />
      </div>

      <div className='participateForm'>
        <ParticipateForm />
      </div>

      <div className='container'>
        <Recorder parentCallback={updateRecordedStory} />
      </div>

    </div>
  )
}

export default Share
