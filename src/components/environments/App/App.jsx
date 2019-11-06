import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { usePageTracking } from 'helpers'
import { Header } from 'organisms'
import { Footer } from 'molecules'
import { About, Share, Listen } from 'pages'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const App = (props) => {
  // used to track page views and send to google analytics
  usePageTracking()

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path={['/', '/about']} component={About} />
        <Route path='/share' component={Share} />
        <Route path='/listen/:id' component={Listen} />
        <Route path='/listen' component={Listen} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
