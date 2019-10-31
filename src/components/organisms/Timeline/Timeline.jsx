import React from 'react'
import './Timeline.css'
import { TimelineEntry } from 'organisms'
import * as myConstClass from '../../atoms/TimelineDescriptions/TimelineDescriptions.jsx'
import picOne from 'assets/timelinepic_one.png'
import picTwo from 'assets/timelinepic_2018_1.png'

const Timeline = () => {
  return (
    <div className='Timeline'>
      <TimelineEntry year='2017' description={myConstClass.par2017} pictureFirst='true' picture={picOne} altText='Woman singing lullaby' />
      <TimelineEntry year='2018' description={myConstClass.par2018Desc1} pictureFirst='false' picture={picTwo} altText='People sitting and listening to audio' />
    </div>
  )
}

export default Timeline