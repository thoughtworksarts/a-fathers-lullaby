import React from 'react'
import Assets from './Assets'
import { shallow } from 'enzyme'

describe('Assets', () => {
  it('matches snapshot', () => {
    const assetsComponent = shallow(<Assets />)
    expect(assetsComponent).toMatchSnapshot()
  })
})
