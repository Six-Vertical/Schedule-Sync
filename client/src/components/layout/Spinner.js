import React from 'react';
import {Fragment} from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
	return (
		<Fragment>
			<img src={spinner} alt='Loader' style={{width: '200px', opacity: '.8', display: 'block', margin: 'auto'}} />
		</Fragment>
	);
};

export default Spinner;
