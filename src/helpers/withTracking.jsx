
import { withRouter } from 'react-router'
import { compose, withHandlers } from 'recompose'

export default compose(
  withRouter,
  withHandlers({
    gaSend: () => (params) => {
      // const { action, category, label } = params
      console.log(`[GA] ${params.action}: `, params)
      // TODO: Once there is a GA key in index.html, uncomment the code below:

      // window.gtag('event', action, {
      //   event_category: category,
      //   event_label: label,
      // })
    },
    findName: () => (child) => {
      const recursiveSearch = (child) => {
        console.log('child', child)
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
  }),
  withHandlers({
    onClickWithTracking: ({ gaSend, findName, onClick, children, location, gaParams = {} }) => (componentName = 'Event') => (e) => {
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
        category: location.pathname,
        label: name
      }, gaParams)

      gaSend(params)

      onClick && onClick(e)
    },
    onPageViewTracking: ({ gaSend }) => (gaParams = {}) => {
      const params = Object.assign({
        action: 'Impression',
        category: window.location.pathname,
        label: 'Directory View'
      }, gaParams)

      gaSend(params)
    }
  })
)
