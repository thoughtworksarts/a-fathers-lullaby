import React from 'react'
import './TimelineEntry.css'
import { TimelinePicture, TimelineText } from 'molecules'

const TimelineEntry = ({ year, description, pictureFirst, picture, altText }) => {
  let left = null
  let right = null

  if (pictureFirst === 'true') {
    left = <TimelinePicture picture={picture} altText={altText} />
    right = <TimelineText year={year} description={description} alignLeft={pictureFirst} />
  } else {
    left = <TimelineText year={year} description={description} alignLeft={pictureFirst} />
    right = <TimelinePicture picture={picture} altText={altText} />
  }

  return (
    <div className='TimelineEntry'>
      {left}
      {right}
    </div>
  )
}

export default TimelineEntry
