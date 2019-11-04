import React from 'react'
import './TimelineText.css'
import { Parallax } from 'react-scroll-parallax'
import { Container } from 'molecules'
const TimelineText = ({ year, description, alignLeft }) => {
  let descAlign = 'TimelineText '
  if (alignLeft === 'true') {
    descAlign += 'left'
  } else {
    descAlign += 'right'
  }
  return (
    <Container scrollAxis='vertical'>
      <Parallax offsetYMin='100px' offsetYMax='-500px'>

        <div className={descAlign}>
          <h3 className='year'>{year}</h3>
          <p className='description'>
            {description}
          </p>
        </div>
      </Parallax>
    </Container>
  )
}

export default TimelineText
