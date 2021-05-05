import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateAccountForm from '../../../components/dashboard/CreateAccountForm';
import store from '../../../store'; // If the component is connected to redux

describe(`CreateAccountForm`, () => {
	// ARRANGE
	beforeEach(() => {
		render(<CreateAccountForm store={store} />);
	});

	it('should  render the correct modal title', () => {
		// ACT

		// ASSERT
		const createBtn = screen.getByText(/new Account/i);
		expect(createBtn).toBeInTheDocument();
	});
});
