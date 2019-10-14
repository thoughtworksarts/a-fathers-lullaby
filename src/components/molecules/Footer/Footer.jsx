import React from 'react'
import mailIcon from 'assets/mail-icon.svg'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='Footer'>
      <p className='copyright'>all content © 2019 <a href='https://www.rashinfahandej.com/' target='_blank' rel='noopener noreferrer'>Rashin Fahandej</a></p>
      <a href='mailto:Rashin.Fahandej@gmail.com'><img className='email-icon' src={mailIcon} alt='email icon' /></a>
    </footer>
  )
}

export default Footer
