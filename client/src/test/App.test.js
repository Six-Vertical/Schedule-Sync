import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
configure({adapter: new Adapter()});
import App from '../App';

describe('<App />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('should render the App compnent', () => {
		expect(wrapper.contains(<App />));
	});
});
