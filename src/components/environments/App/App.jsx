import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { usePageTracking } from 'helpers'
import { Header } from 'organisms'
import { About, Share, Listen } from 'pages'
import './App.css'

export const App = (props) => {
  // used to track page views and send to google analytics
  usePageTracking()
  console.log('process env', process.env)

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path={['/', '/about']} component={About} />
        <Route path='/share' component={Share} />
        <Route path='/listen' component={Listen} />
      </Switch>
    </div>
  )
}

export default App
