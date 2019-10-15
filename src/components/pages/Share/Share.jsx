import React from 'react'
import './Share.css'
import { Footer } from 'molecules'

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
      </div>
      <Footer />
    </div>
  )
}

export default Share
