import {render, screen} from '@testing-library/react';
import App from '../App';

test('Renders create account button', () => {
	render(<App />);
	const createBtn = screen.getByText(/create account/i);

	expect(createBtn).toBeInTheDocument();
});
