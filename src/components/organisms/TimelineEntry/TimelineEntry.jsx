import React from 'react'
import './TimelineEntry.css'
import { TimelinePicture, TimelineText } from 'molecules'

const TimelineEntry = ({ year, description, pictureFirst }) => {
  let left = null
  let right = null

  if (pictureFirst === 'true') {
    left = <TimelinePicture />
    right = <TimelineText year={year} description={description} />
  } else {
    left = <TimelineText year={year} description={description} />
    right = <TimelinePicture />
  }

  return (
    <div className='TimelineEntry'>
      {left}
      {right}
    </div>
  )
}

export default TimelineEntry
