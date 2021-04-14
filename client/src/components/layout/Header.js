import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
	return (
		<nav className='navbar navbar-dark bg-dark'>
			<Link to='/' className='navbar-brand'>
				<h1>Schedule-Sync</h1>
			</Link>
		</nav>
	);
};

export default Header;
