import React from 'react'
import './TimelineEntry.css'

import * as myConstClass from '../../atoms/TimelineDescriptions/TimelineDescriptions.jsx'
import { TimelinePicture, TimelineText } from 'molecules'

const TimelineEntry = () => {
  return (
    <div className='TimelineEntry'>
      <TimelinePicture />
      <TimelineText year='2017' text={myConstClass.par2017} />
    </div>
  )
}

export default TimelineEntry
