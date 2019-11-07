import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Explore from './Explore'
import { shallow } from 'enzyme'

describe('Explore Page', () => {
  it('matches snapshot', () => {
    const assetsComponent = shallow(<Router><Explore /></Router>)
    expect(assetsComponent).toMatchSnapshot()
  })
})
