import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';
import Enzyme from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));