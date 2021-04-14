import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAccount, deleteAccount} from '../../actions/account';

const DashAccountItem = ({acc, getAccount, deleteAccount, closeModal, openModal}) => {
	const fetchAccount = (id) => {
		getAccount(id);
		openModal();
	};

	return (
		<tr>
			<td>{acc.name}</td>
			<td>{acc._id}</td>
			<td>
				<button className='btn btn-sm btn-outline-dark' title='Edit' onClick={() => fetchAccount(acc._id)}>
					<i className='fas fa-edit'></i>
				</button>
			</td>
			<td>
				<button className='btn btn-sm btn-outline-danger' title='Delete' onClick={() => deleteAccount(acc._id)}>
					<i className='fas fa-trash-alt'></i>
				</button>
			</td>
		</tr>
	);
};

DashAccountItem.propTypes = {
	getAccount: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

export default connect(null, {getAccount, deleteAccount})(DashAccountItem);
