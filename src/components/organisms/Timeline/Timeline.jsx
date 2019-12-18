import React from 'react'
import './Timeline.css'
import { TimelineEntry } from 'organisms'
import * as myConstClass from 'atoms/TimelineDescriptions/TimelineDescriptions.jsx'
import picOne from 'assets/timelinepic_one.png'
import picTwo from 'assets/timelinepic_2018_1.png'
import picThree from 'assets/timelinepic_2018_2.png'

const Timeline = () => {
  return (
    <div className='Timeline'>
      <TimelineEntry entryNum='/about/3' pictureFirst='true' timelineInfo={TimelineDescriptions.timelineEntry3} />
      <TimelineEntry entryNum='/about/2' pictureFirst='false' timelineInfo={TimelineDescriptions.timelineEntry2} />
      <TimelineEntry entryNum='/about/1' pictureFirst='true' timelineInfo={TimelineDescriptions.timelineEntry1} />
    </div>
  )
}

export default Timeline
