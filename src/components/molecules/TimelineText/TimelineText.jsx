import React from 'react'
import './TimelineText.css'
const TimelineText = ({ year, description, alignLeft }) => {
  let descAlign = 'TimelineText '
  if (alignLeft === 'true') {
    descAlign += 'left'
  } else {
    descAlign += 'right'
  }
  return (
    <div className={descAlign}>
      <h3 className='year'>{year}</h3>
      <p className='description'>
        {description}
      </p>
    </div>
  )
}

export default TimelineText
