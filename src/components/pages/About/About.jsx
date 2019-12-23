import React, { useEffect, useState } from 'react'
import { Button } from 'atoms'
import { Timeline } from 'organisms'
import './About.css'

const About = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)
  const [firstParClass, setFirstParClass] = useState('')
  const [secondParClass, setSecondParClass] = useState('')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    isMobile
      ? setFirstParClass('mobile-intro-par1')
      : setFirstParClass('desktop-intro-par1')
  }, [isMobile])

  useEffect(() => {
    isMobile
      ? setSecondParClass('mobile-intro-par2')
      : setSecondParClass('desktop-intro-par2')
  }, [isMobile])

  const secondPar = <h2 className={secondParClass}>Personal stories have transformative power and create profound encounters. A Father's Lullaby invites you to become part of a growing movement.</h2>
  return (
    <div className='AboutPage'>
      <div className='intro'>
        <h1 id='first-par' className={firstParClass}>There are <span className='highlight'>2.7 million children</span> with a parent in prison or jail. 92% of parents <span className='highlight'>in prison are fathers.</span></h1>
        <Button to='/share'>Participate</Button>
        {isMobile ? <div /> : secondPar}
      </div>
      {isMobile ? secondPar : <div />}
      <Timeline />
    </div>
  )
}

export default About
