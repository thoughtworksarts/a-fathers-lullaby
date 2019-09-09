import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Header } from 'molecules'
import { About, Share, Listen } from 'pages'
import './App.css'

function App () {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' exact component={About} />
          <Route path='/share' component={Share} />
          <Route path='/listen' component={Listen} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
