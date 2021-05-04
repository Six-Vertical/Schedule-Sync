import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, mount} from 'enzyme';
configure({adapter: new Adapter()});
import Dashboard from '../../../components/dashboard/Dashboard';
import store from '../../../store';

describe('<Dashboard />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Dashboard store={store} />);
	});

	it(`Should render the <Dashboard /> compnent`, () => {
		expect(wrapper.prop('getAccounts')).toBeDefined();
	});
});
