import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'atoms'

import { useOnClickWithTracking } from 'helpers'
import { testHook } from 'helpers/testHook'
import { BrowserRouter as Router } from 'react-router-dom'

let onClick

describe('withTracking', () => {
  it('should use the onClick instead of onClickWithTracking if gaTracking prop is false', () => {
    const props = {
      onClick: jest.fn(),
      gaTrack: false
    }

    testHook(() => {
      onClick = useOnClickWithTracking(props, 'Button')
    })

    expect(typeof onClick === 'function').toBe(true)
    expect(onClick._isMockFunction).toBe(true)
  })

  it('should use the onClickWithTracking AND onClick if gaTracking prop is true.', () => {
    const props = {
      onClick: jest.fn(),
      gaTrack: true
    }

    const wrapper = shallow(
      <Router>
        <Button {...props}>Click me.</Button>
      </Router>
    )

    wrapper.find(Button).simulate('click')

    expect(props.onClick.mock.calls).toHaveLength(1)
  })
})
