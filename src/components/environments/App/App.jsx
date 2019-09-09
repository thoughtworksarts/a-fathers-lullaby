import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Header } from 'molecules'
import { About, Share, Listen } from 'pages'
import './App.css'

function App () {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/' exact component={About} />
        <Route path='/share' component={Share} />
        <Route path='/listen' component={Listen} />
      </Switch>
    </div>
  )
}

export default App
