import React, { useEffect, useState } from 'react'
import { Button } from 'atoms'
import './Intro.css'

const Intro = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)
  const [firstParClass, setFirstParClass] = useState('')
  const [secondParClass, setSecondParClass] = useState('')

  const secondPar = <h2 className={secondParClass}>Personal stories have transformative power and create profound encounters. A Father's Lullaby invites you to become part of a growing movement.</h2>

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

  return (
    <div className='intro'>
      <div className='intro-img'>
        <h1 id='first-par' className={firstParClass}>
          There are <span className='intro-highlight'>2.7 million children</span> with
          a parent in prison or jail. 92% of parents{' '}
          <span className='intro-highlight'>in prison are fathers.</span>
        </h1>
        <Button to='/share'>Participate</Button>
        {isMobile ? <div /> : secondPar}
      </div>
      {isMobile ? secondPar : <div />}
    </div>
  )
}

export default Intro
