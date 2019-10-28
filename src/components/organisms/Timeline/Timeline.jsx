import React from 'react'
import './Timeline.css'
import { TimelineEntry } from 'organisms'
import * as myConstClass from '../../atoms/TimelineDescriptions/TimelineDescriptions.jsx'

const Timeline = () => {
  return (
    <div className='Timeline'>
      <TimelineEntry year='2017' description={myConstClass.par2017} pictureFirst='true' />
    </div>
  )
}

export default Timeline
