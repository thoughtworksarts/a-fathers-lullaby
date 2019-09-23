import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import until from 'enzyme-shallow-until'
import ShallowWrapper from 'enzyme/ShallowWrapper'

Enzyme.configure({ adapter: new Adapter() })
ShallowWrapper.prototype.until = until

global.gtag = jest.fn()
