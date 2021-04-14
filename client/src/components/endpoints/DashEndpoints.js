import React from 'react';
import DashEndpointItem from './DashEndpointItem';

const DashEndpoints = ({endpoints, openModal, closeModal}) => {
	return (
		<table className='table table-striped'>
			<thead>
				<tr>
					<th scope='col'>Account</th>
					<th scope='col'>Username</th>
					<th scope='col'>Endpoint</th>
					<th scope='col'>Endpoint ID</th>
					<th scope='col'>API UserID</th>
					<th scope='col'>API Key</th>
					<th scope='col' className='bg-none'></th>
					<th scope='col' className='bg-none'></th>
				</tr>
			</thead>
			<tbody>
				{endpoints.map((ep) => (
					<DashEndpointItem key={ep._id} ep={ep} openModal={openModal} closeModal={closeModal} />
				))}
			</tbody>
		</table>
	);
};

export default DashEndpoints;
