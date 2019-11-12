import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Share from './Share'
import { shallow } from 'enzyme'

describe('Share Page', () => {
  it('matches snapshot', () => {
    const shareComponent = shallow(<Router><Share /></Router>)
    expect(shareComponent).toMatchSnapshot()
  })
})
