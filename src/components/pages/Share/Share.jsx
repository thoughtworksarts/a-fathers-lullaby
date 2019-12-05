import React from 'react'
import { Recorder, ParticipateForm, ShareLocation } from 'organisms'
import './Share.css'

const Share = () => {
  return (

    <div className='SharePage'>

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
        <Recorder />
      </div>

    </div>
  )
}

export default Share
