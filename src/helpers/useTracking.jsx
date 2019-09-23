
import { useEffect, useContext } from 'react'
import { __RouterContext } from 'react-router'

const findName = (child) => {
  const recursiveSearch = (child) => {
    const { props } = child

    if (!props.children && child.type.name) {
      // if the nested component is not rendering a string on the DOM (i.e. an image or logo)
      // then return the name of the child component
      return child.type.name
    } else if (typeof props.children === 'string') {
      // if the nested component is rendering a string on the DOM, return the string
      return props.children
    } else {
      // if the nested component is wrapping another component,
      // recursively drill down through the nested elements.
      return recursiveSearch(props.children)
    }
  }
  return child.props && recursiveSearch(child)
}

const gaSend = (params) => {
  const { action, category, label } = params
  // console.log(`[GA] ${params.action}: `, params)

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
  })
}

export const useOnClickWithTracking = ({ children, gaTrack = true, gaParams = {}, onClick }, componentName = 'Event') => {
  const routerContext = useContext(__RouterContext)

  const handleClickWithTracking = (e) => {
    let name

    if (children) {
      // if the immediate child is type string, set the name as the string
      // else, find the nested string OR if that doesn't exist, set as the name of the nested component.
      name = typeof children === 'string'
        ? children
        : findName(children)
    }

    const params = Object.assign({
      action: `${componentName} Click`,
      category: routerContext.location.pathname,
      label: name
    }, gaParams)

    gaSend(params)

    onClick && onClick(e)
  }

  return gaTrack ? handleClickWithTracking : onClick
}

export const usePageTracking = (gaParams = {}) => {
  const routerContext = useContext(__RouterContext)

  useEffect(() => {
    const params = Object.assign({
      action: 'Page View',
      category: routerContext.location.pathname,
      label: ''
    }, gaParams)

    gaSend(params)
  }, [routerContext.location, gaParams])
}
