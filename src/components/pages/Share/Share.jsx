import React from 'react'
import { Recorder } from 'organisms'
import './Share.css'

const Share = () => {
  return (
    <div>
      <div className='SharePage'>
        <div className='recordingTitle'>
          Together we create a rich audio landscape of <span className='highlight'>memories and stories</span>. Prepare for your recording and build our shared experience.
        </div>

        <div className='recordingInstruction'>
          Please <span className='highlight'>answer the following questions</span> to help listeners discover your contribution.
        </div>

        <Recorder />
      </div>
      
    </div>
  )
}

export default Share
