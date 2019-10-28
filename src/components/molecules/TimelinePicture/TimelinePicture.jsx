import React from 'react'
import './TimelinePicture.css'

const TimelinePicture = ({ altText, picture }) => {
  return (
    <div className='TimelinePicture'>
      <img alt={altText} src={picture} />
    </div>
  )
}

export default TimelinePicture
