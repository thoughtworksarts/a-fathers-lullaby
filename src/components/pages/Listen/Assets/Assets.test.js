import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Assets from './Assets'
import { shallow } from 'enzyme'

describe('Assets', () => {
  it('matches snapshot', () => {
    const assetsComponent = shallow(<Router><Assets /></Router>)
    expect(assetsComponent).toMatchSnapshot()
  })
})
