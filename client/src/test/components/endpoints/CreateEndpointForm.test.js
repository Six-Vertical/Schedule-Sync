import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateEndpointForm from '../../../components/endpoints/CreateEndpointForm';
import store from '../../../store';

describe(`CreateAccountForm`, () => {
	beforeEach(() => {
		render(<CreateEndpointForm store={store} />);
	});

	it('should have the correct Modal Title', () => {
		const modalTitle = screen.getByText('Create Endpoint');

		expect(modalTitle).toBeInTheDocument();
	});

	// it('should render black text inputs', async () => {
	// 	try {
	// 		const inputs = await screen.findAllByRole('textbox');

	// 		console.log({inputs});
	// 		expect(inputs[0]).toBeInTheDocument();
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// });
});
