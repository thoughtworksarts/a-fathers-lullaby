import React from 'react'
import './TimelineText.css'
import { Parallax } from 'react-scroll-parallax'
import { Container } from 'molecules'
const TimelineText = ({ year, text, direction }) => {
  return (
    <Container scrollAxis='vertical'>
      <Parallax offsetYMin='100px' offsetYMax='-500px'>

        <div className='TimelineText'>
          <h3>{year}</h3>
          <p>
            {text}
          </p>
        </div>
      </Parallax>
    </Container>
  )
}

export default TimelineText
