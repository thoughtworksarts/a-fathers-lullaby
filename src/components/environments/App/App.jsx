import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { usePageTracking } from 'helpers'
import { Header, TimelineEntryMore } from 'organisms'
import { Footer } from 'molecules'
import { About, Share, Library, Explore } from 'pages'

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
        <Route path='/explore/:id' component={Explore} />
        <Route path='/explore' component={Explore} />
        <Route path='/library/:id' component={Library} />
        <Route path='/library' component={Library} />
        <Route path='/about/:id' component={TimelineEntryMore} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
