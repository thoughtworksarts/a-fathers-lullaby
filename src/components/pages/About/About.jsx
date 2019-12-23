import React, { useEffect, useState } from 'react'
import { Button } from 'atoms'
import { Timeline } from 'organisms'
import './About.css'

const About = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  const createMobileSecondParagraph = () => {

  }

  const createDesktopSecondParagraph = () => {
    return (
      <h2 className='desktop-intro-par2'>Personal stories have transformative power and create profound encounters. A Father's Lullaby invites you to become part of a growing movement.</h2>
    )
  }

  return (
    <div className='AboutPage'>
      <div className='intro'>
        <h1 className='desktop-intro-par1'>There are <span className='highlight'>2.7 million children</span> with a parent in prison or jail. 92% of parents <span className='highlight'>in prison are fathers.</span></h1>
        <Button to='/share'>Participate</Button>
        {isMobile
          ? createMobileSecondParagraph()
          : createDesktopSecondParagraph()}

      </div>
      <Timeline />
    </div>
  )
}

export default About
