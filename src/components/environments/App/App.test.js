/* eslint-env mocha */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { shallow } from 'enzyme'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Router>
        <App />
      </Router>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('runs an Enzyme test without crashing', () => {
    const appComponent = shallow(<App />)
    expect(appComponent).toMatchSnapshot()
  })
})
