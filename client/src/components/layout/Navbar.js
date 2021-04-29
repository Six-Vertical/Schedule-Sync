import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
	return (
		<div className='bg-light border-right' id='sidebar-wrapper'>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item text-center'>
					<NavLink exact to='/' activeClassName='current' className='text-dark p-1'>
						Accounts
					</NavLink>
				</li>
				<li className='list-group-item text-center'>
					<NavLink to='/endpoints' activeClassName='current' className='text-dark p-1'>
						Endpoints
					</NavLink>
				</li>
				<li className='list-group-item text-center'>
					<NavLink to='/calendars' activeClassName='current' className='text-dark p-1'>
						Calendars
					</NavLink>
				</li>
				<li className='list-group-item text-center'>
					<NavLink to='/mapping' activeClassName='current' className='text-dark p-1'>
						Appointment Types
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
