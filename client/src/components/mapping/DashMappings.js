import React from 'react';
import MappingItem from './MappingItem';

const DashMappings = ({mappings, openModal, closeModal}) => {
	return (
		<table className='table table-striped'>
			<thead>
				<tr>
					<th>Account</th>
					<th>Endpoint</th>
					<th>Appointment-Type</th>
					<th></th>
					<th>Account</th>
					<th>Endpoint</th>
					<th>Appointment-Type</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{mappings.map((ma) => (
					<MappingItem key={ma._id} ma={ma} openModal={openModal} closeModal={closeModal} />
				))}
			</tbody>
		</table>
	);
};

export default DashMappings;
