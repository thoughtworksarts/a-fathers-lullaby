import React from 'react'
import { TimelinePicture, TimelineText } from 'molecules'
import './TimelineEntry.css'
import TimelinePictureGrid from '../../molecules/TimelinePictureGrid/TimelinePictureGrid'

const TimelineEntry = ({ timelineInfo, pictureFirst, entryNum }) => {
  let left = null
  let right = null

  if (pictureFirst === 'true') {
    left = <TimelinePictureGrid pictureArray={timelineInfo.imgs} altText={timelineInfo.alt_text} />
    right = <TimelineText year={timelineInfo.year} description={timelineInfo.short_desc} alignLeft={pictureFirst} entryNum={entryNum} />
  } else {
    left = <TimelineText year={timelineInfo.year} description={timelineInfo.short_desc} alignLeft={pictureFirst} entryNum={entryNum} />
    right = <TimelinePictureGrid pictureArray={timelineInfo.imgs} altText={timelineInfo.alt_text} />
  }

  return (
    <div className='TimelineEntry'>
      {left}
      {right}
    </div>
  )
}

export default TimelineEntry
