import { shallow } from 'enzyme'
import React from 'react'
import { Button } from './Button'

describe('Button', () => {
  it('should render button name based on props', () => {
    const wrapper = shallow(<div><Button to='./share' className='Button'>Participate</Button></div>)
    const button = wrapper.find('.Button')
    expect(button.children().text()).toEqual('Participate')
  })
})
