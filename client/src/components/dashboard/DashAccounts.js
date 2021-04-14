import React from 'react';
import DashAccountItem from './DashAccountItem';

const DashAccounts = ({accounts, closeModal, openModal}) => {
	return (
		<table className='table table-striped'>
			<thead>
				<tr>
					<th scope='col'>Account</th>
					<th scope='col'>Account ID</th>
					<th scope='col' className='bg-none'></th>
					<th scope='col' className='bg-none'></th>
				</tr>
			</thead>
			<tbody>
				{accounts.map((acc) => (
					<DashAccountItem key={acc._id} acc={acc} closeModal={closeModal} openModal={openModal} />
				))}
			</tbody>
		</table>
	);
};

export default DashAccounts;
