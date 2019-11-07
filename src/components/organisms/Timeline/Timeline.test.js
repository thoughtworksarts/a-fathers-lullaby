import React from 'react'
import Timeline from './Timeline'
import { shallow } from 'enzyme'

describe('Timeline', () => {
  it('matches snapshot', () => {
    const timelineComponent = shallow(<Timeline />)
    expect(timelineComponent).toMatchSnapshot()
  })
})
