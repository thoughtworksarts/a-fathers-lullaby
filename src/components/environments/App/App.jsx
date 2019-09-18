import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withTracking } from 'helpers'
import { Header } from 'organisms'
import { About, Share, Listen } from 'pages'
import './App.css'

export const App = ({ onPageViewTracking, location }) => {
  // used to track page views and send to google analytics
  useEffect(() => {
    onPageViewTracking()
  }, [location, onPageViewTracking])

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={About} />
        <Route path='/share' component={Share} />
        <Route path='/listen' component={Listen} />
      </Switch>
    </div>
  )
}

export default withTracking(App)
