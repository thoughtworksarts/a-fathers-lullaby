import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { usePageTracking } from 'helpers'
import { Header } from 'organisms'
import { Footer } from 'molecules'
import { About, Share, Listen, Home } from 'pages'
import './App.css'
import { ParallaxProvider } from 'react-scroll-parallax'

export const App = (props) => {
  // used to track page views and send to google analytics
  usePageTracking()

  return (
    <ParallaxProvider>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path={['/', '/about']} component={About} />
          <Route path='/share' component={Share} />
          <Route path='/listen' component={Listen} />
          <Route path='/home' component={Home} />

        </Switch>
        <Footer />
      </div>
    </ParallaxProvider>
  )
}

export default App
