
import { withRouter } from 'react-router'
import { compose, withHandlers } from 'recompose'

export default compose(
  withRouter,
  withHandlers({
    onClickButtonWithTracking: ({ onClick, children, label, location, match, gaParams = {} }) => (e) => {
      let btnName

      if (children) {
        btnName = Array.isArray(children) ? children.find(child => typeof child === 'string') : children
      }

      const {
        action = 'Button Click',
        category = location.pathname,
        label = btnName
      } = gaParams

      // window.gtag('event', action, {
      //   'event_category': category,
      //   'event_label': label
      // })

      console.log('[GA] Button clicked: ', { action, category, label })
      onClick && onClick(e)
    },
    onPageViewTracking: (props) => (gaParams = {}) => {
      const {
        action = 'Impression',
        category = window.location.pathname,
        label = 'Directory View'
      } = gaParams

      console.log('[GA] Page changed: ', { action, category, label })

      // window.gtag('event', action, {
      //   event_category: category,
      //   event_label: label,
      //   transport_type: 'beacon'
      // })
    }
  })
)
