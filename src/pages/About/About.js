import React from 'react'
import logo from '../../assets/logo-large.png'
import './About.css'
import Footer from '../../components/Footer/Footer'

const About = () => {
  return (
    <div className='AboutPage'>
      <h1>About</h1>
      <img src={logo} alt="A Father's Lullaby" />
      <p>A Father’s Lullaby highlights the role of men in raising children while underlining the absence of fathers due to racial disparities of mass incarceration. Policies have taken their toll on children, our next generation. This contributory project invites you to record your voice, share insight, sing a lullaby and create a collective voice for this issue and to imagine social policies based on support not criminalization. The space of love and shared memories of childhood becomes the place to contemplate difficult issues our society is facing today.</p>
      <Footer />
    </div>
  )
}

export default About
