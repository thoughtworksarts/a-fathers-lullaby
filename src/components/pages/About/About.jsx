import React from 'react'
import './About.css'

import { Button } from 'atoms'

const About = () => {
  return (
    <div className='AboutPage'>
      <div className='intro'>
        <h1>There are <span className='highlight'>2.7 million children</span> with a parent in prison or jail. 92% of parents <span className='highlight'>in prison are fathers.</span></h1>
        <Button to='/share'>Participate</Button>
        <h2>Personal stories have transformative power and create profound encounters. A Father's Lullaby invites you to become part of a growing movement.</h2>
      </div>
    </div>
  )
}

export default About
