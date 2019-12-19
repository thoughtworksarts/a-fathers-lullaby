import React from 'react'
import { TimelineEntry } from 'organisms'
import * as TimelineDescriptions from 'atoms/TimelineDescriptions/TimelineDescriptions.jsx'
import './Timeline.css'

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
