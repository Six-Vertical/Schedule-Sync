import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
	return (
		<div className='bg-light border-right' id='sidebar-wrapper'>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item'>
					<NavLink exact to='/' activeClassName='current' className='text-dark p-1 nav-item'>
						Accounts
					</NavLink>
				</li>
				<li className='list-group-item'>
					<NavLink to='/endpoints' activeClassName='current' className='text-dark p-1 nav-item'>
						Endpoints
					</NavLink>
				</li>
				<li className='list-group-item'>
					<NavLink to='/calendars' activeClassName='current' className='text-dark p-1 nav-item'>
						Calendars
					</NavLink>
				</li>
				<li className='list-group-item'>
					<NavLink to='/mapping' activeClassName='current' className='text-dark p-1 nav-item'>
						Appointment Types
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
