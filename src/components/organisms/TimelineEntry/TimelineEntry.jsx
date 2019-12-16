import React from 'react'
import './TimelineEntry.css'
import { TimelinePicture, TimelineText } from 'molecules'

const TimelineEntry = ({ year, description, pictureFirst, picture, altText, entryNum }) => {
  let left = null
  let right = null

  if (pictureFirst === 'true') {
    left = <TimelinePicture picture={picture} altText={altText} />
    right = <TimelineText year={year} description={description} alignLeft={pictureFirst} entryNum={entryNum}/>
  } else {
    left = <TimelineText year={year} description={description} alignLeft={pictureFirst} entryNum={entryNum}/>
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
