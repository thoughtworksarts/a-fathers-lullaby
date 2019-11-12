import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Library from './Library'
import { shallow } from 'enzyme'

describe('Library Page', () => {
  it('matches snapshot', () => {
    const libraryComponent = shallow(<Router><Library /></Router>)
    expect(libraryComponent).toMatchSnapshot()
  })
})
