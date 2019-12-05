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
    
    const form = '{"project_id": 1,"client_system": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"}'
    console.log(form)
    
    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_SESSIONS_URL}`, {
      method: 'POST',
      headers: {
        authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`,
        "content-type": "application/json"
      },
      "processData": false,
      "body": form 
    })
    .then((res) => {
      console.log(res.json())
      })
    .catch(err => console.log(err))

      /**
      * Step 2:
      * Create a new envelope 
      * POST localhost:8888/api/2/envelopes/
      * Save the id returned
      */
      
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
