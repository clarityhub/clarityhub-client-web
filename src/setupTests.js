import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

beforeAll(() => {
	Object.defineProperty(window.navigator, 'userAgent', (function definePropertyUserAgent(_value) {
		return {
			get: function get() {
				return _value;
			},
			set: function set(v) {
				/* eslint-disable-next-line no-param-reassign */
				_value = v;
			},
		};
	}(window.navigator.userAgent)));
});
