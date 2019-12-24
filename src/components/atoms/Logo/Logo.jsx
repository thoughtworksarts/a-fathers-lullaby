import React, { useEffect, useState } from 'react'
import desktopLogo from 'assets/logo-small.png'
import mobileLogo from 'assets/mobileLogo.png'
import './Logo.css'

const Logo = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)
  const [logo, setLogo] = useState('')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    isMobile
      ? setLogo(<img src={mobileLogo} alt="A Father's Lullaby" className='mobile-logo' />)
      : setLogo(<img src={desktopLogo} alt="A Father's Lullaby" className='desktop-logo' />)
  }, [isMobile])

  return (
    logo
  )
}

export default Logo
