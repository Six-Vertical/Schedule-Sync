import React from 'react';
import CalendarItem from './CalendarItem';

const Calendars = ({closeModal, openModal, calendars}) => {
	return (
		<table className='table table-striped'>
			<thead>
				<tr>
					<th scope='col'>Parent Calendar</th>
					<th scope='col'>Account</th>
					<th scope='col'>Endpoint</th>
					<th scope='col'>External ID</th>
					<th scope='col'></th>
					<th scope='col'>Child Calendar</th>
					<th scope='col'>Account</th>
					<th scope='col'>Endpoint</th>
					<th scope='col'>External ID</th>
					<th scope='col'></th>
					<th scope='col'></th>
				</tr>
			</thead>
			<tbody>
				{calendars.map((cal) => (
					<CalendarItem key={cal._id} cal={cal} openModal={openModal} closeModal={closeModal} />
				))}
			</tbody>
		</table>
	);
};

export default Calendars;
