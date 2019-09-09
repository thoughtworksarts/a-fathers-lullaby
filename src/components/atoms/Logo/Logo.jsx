import React from 'react'
import smallLogo from 'assets/logo-small.png'
import largeLogo from 'assets/logo-large.png'

const Logo = ({ size = 'lg' }) => {
  const logos = {
    sm: smallLogo,
    lg: largeLogo
  }

  return (
    <img src={logos[size]} alt="A Father's Lullaby" className='logo' />
  )
}

export default Logo
