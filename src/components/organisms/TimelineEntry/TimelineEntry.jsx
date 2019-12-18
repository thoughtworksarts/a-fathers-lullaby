import React from 'react'
import { TimelinePicture, TimelineText } from 'molecules'
import './TimelineEntry.css'

const TimelineEntry = ({ timelineInfo, pictureFirst, entryNum }) => {
  let left = null
  let right = null

  if (pictureFirst === 'true') {
    left = <TimelinePicture picture={timelineInfo.img} altText={timelineInfo.alt_text} />
    right = <TimelineText year={timelineInfo.year} description={timelineInfo.short_desc} alignLeft={pictureFirst} entryNum={entryNum} />
  } else {
    left = <TimelineText year={timelineInfo.year} description={timelineInfo.short_desc} alignLeft={pictureFirst} entryNum={entryNum} />
    right = <TimelinePicture picture={timelineInfo.img} altText={timelineInfo.alt_text} />
  }

  return (
    <div className='TimelineEntry'>
      {left}
      {right}
    </div>
  )
}

export default TimelineEntry
