import React from 'react'
import './TimelinePicture.css'

const TimelinePicture = ({ altText, picture }) => {
  return (
      <img className='TimelinePicture' alt={altText} src={picture} />
  )
}

export default TimelinePicture
