import React from 'react'
import { mount } from 'enzyme'
import { Button } from 'atoms/Button/Button'
import { Link } from 'atoms/Link/Link'
import { withTracking } from 'helpers'
import { BrowserRouter as Router } from 'react-router-dom'

describe('withTracking', () => {
  const mountWithProps = (Component, props = {}) => {
    const CompWithTracking = withTracking(Component)

    return mount(
      <Router>
        <CompWithTracking {...props} />
      </Router>
    )
  }

  const mountAndClick = (Component, props) => {
    const CompWithTracking = withTracking(Component)

    const wrapper = mount(
      <Router>
        <CompWithTracking {...props} />
      </Router>
    )

    const clickable = wrapper.find(Component)
    clickable.simulate('click')

    return wrapper
  }

  it('should use the onClick instead of onClickWithTracking if gaTracking prop is false', () => {
    const props = {
      onClick: jest.fn(),
      onClickWithTracking: jest.fn(),
      gaTrack: false
    }

    mountAndClick(Button, props)

    expect(props.onClickWithTracking.mock.calls).toHaveLength(0)
    expect(props.onClick.mock.calls).toHaveLength(1)
  })

  it('should use the onClickWithTracking AND onClick if gaTracking prop is true.', () => {
    const props = {
      onClickWithTracking: jest.fn(arg => arg),
      onClick: jest.fn(),
      gaTrack: true
    }

    mountAndClick(Button, props)

    expect(props.onClickWithTracking.mock.calls).toHaveLength(1)
    expect(props.onClick.mock.calls).toHaveLength(1)
  })

  it('onClickWithTracking should return an argument.', () => {
    const props = {
      onClickWithTracking: jest.fn(arg => arg),
      gaTrack: true
    }

    mountAndClick(Button, props)

    expect(props.onClickWithTracking.mock.calls).toHaveLength(1)
    expect(props.onClickWithTracking).toBeCalledWith('Button')
  })

  it('Override default params if custom params are added to component', () => {
    const props = {
      gaSend: jest.fn(arg => console.log(arg)),
      gaParams: {
        label: 'label',
        action: 'action',
        category: 'category' 
      }
    }

    mountAndClick(Button, props)

    expect(props.gaSend.mock.calls).toHaveLength(1)
    expect(props.gaSend).toBeCalledWith(props.gaParams)
  })

  it('if a Button is clicked, the default params.action should return Button Clicked', () => {
    const props = {
      gaSend: jest.fn(params => params)
    }

    mountAndClick(Button, props)

    expect(props.gaSend.mock.calls).toHaveLength(1)
    expect(props.gaSend.mock.results[0].value.action).toEqual('Button Click')
  })

  it('if a Link is clicked, the default params.action should return Link Clicked', () => {
    const props = {
      gaSend: jest.fn(params => params),
      to: '/'
    }

    mountAndClick(Link, props)

    expect(props.gaSend.mock.calls).toHaveLength(1)
    expect(props.gaSend.mock.results[0].value.action).toEqual('Link Click')
  })
})
