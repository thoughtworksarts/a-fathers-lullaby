import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'atoms/Button/Button'
import { withTracking } from 'helpers'
import { BrowserRouter as Router } from 'react-router-dom'

describe('withTracking', () => {
  const shallowWithProps = (Component, props = {}) => {    
    const Base = () => <Component {...props} />
    const CompWithTracking = withTracking(Base)

    return shallow(
      <Router>
        <CompWithTracking />
      </Router>
    ).until(Component)
  }

  it('Button with withTracking wrapper exists', () => {
    const wrapper = shallowWithProps(Button)
    expect(wrapper.exists()).toBe(true)
  })

  it('should use the onClickWithTracking AND onClick if gaTracking prop is true.', () => {
    const withTrackingMockFunc = jest.fn(arg => console.log(arg))
    const onClickMockFunc = jest.fn()

    const props = {
      onClickWithTracking: withTrackingMockFunc,
      onClick: onClickMockFunc,
      gaTrack: true
    }

    const wrapper = shallowWithProps(Button, props)
    wrapper.html()

    wrapper.simulate('click')

    expect(withTrackingMockFunc.mock.calls).toHaveLength(1)
    expect(onClickMockFunc.mock.calls).toHaveLength(1)
  })
  
  it('onClickWithTracking should return an argument.', () => {
    const withTrackingMockFunc = jest.fn(arg => console.log(arg))
    

    const props = {
      onClickWithTracking: withTrackingMockFunc,
      gaTrack: true
    }

    const wrapper = shallowWithProps(Button, props)
    wrapper.html()

    wrapper.simulate('click')

    expect(withTrackingMockFunc.mock.calls).toHaveLength(1)
    expect(withTrackingMockFunc).toBeCalledWith('Button')
  })

  it('should use the onClick instead of onClickWithTracking if gaTracking prop is false', () => {
    const withTrackingMockFunc = jest.fn()
    const onClickMockFunc = jest.fn()

    const props = {
      onClickWithTracking: withTrackingMockFunc,
      onClick: onClickMockFunc,
      gaTrack: false
    }

    const wrapper = shallowWithProps(Button, props)
    wrapper.html()

    wrapper.simulate('click')
    
    expect(withTrackingMockFunc.mock.calls).toHaveLength(0)
    expect(onClickMockFunc.mock.calls).toHaveLength(1)
  })

  describe('default params', () => {
    it.only('Override default params if custom params are added to component', () => {
      const mockFn = jest.fn(arg => console.log('gaSend', arg))
      // const mockFn2 = jest.fn(arg => console.log('with tracking', arg))

      const props = {
        // onClickWithTracking: mockFn2,
        gaSend: mockFn,
        gaTrack: true
      }

      const result = {
        label: 'label', 
        action: 'action',
        category: 'category'
      }

      const wrapper = shallowWithProps(Button, props)
      wrapper.html()

      console.log('wrapper', wrapper.props());
      

      wrapper.simulate('click')

      expect(mockFn).toBeCalledWith(result)
    })

    it.skip('use name of nested component as label if the children do not render a string to the DOM', () => {

    })

    it.skip('', () => {

    })
  })
})
