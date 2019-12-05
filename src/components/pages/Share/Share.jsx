import React, { useState } from 'react'
import { Recorder, ParticipateForm, ShareLocation } from 'organisms'
import './Share.css'

const Share = () => {
  const [recordedStory, setRecordedStory] = useState('')

  const updateRecordedStory = (blobURL) => {
    setRecordedStory(blobURL)
    console.log('Recorded Story blob URL ' + recordedStory)
  }

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
