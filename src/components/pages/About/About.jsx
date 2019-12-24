import React from 'react'
import { Intro } from 'molecules'
import { Timeline } from 'organisms'
import './About.css'

const About = () => {
  return (
    <div className='AboutPage'>
      <Intro />
      <Timeline />
    </div>
  )
}

export default About
