import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import About from './About'
import { shallow } from 'enzyme'

describe('About Page', () => {
  it('matches snapshot', () => {
    const aboutComponent = shallow(<Router><About /></Router>)
    expect(aboutComponent).toMatchSnapshot()
  })
})
