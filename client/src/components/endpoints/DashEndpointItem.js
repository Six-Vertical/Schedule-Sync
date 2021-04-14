import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getEndpoint, deleteEndpoint} from '../../actions/endpoint';

const DashEndpointItem = ({ep, openModal, getEndpoint, deleteEndpoint}) => {
	const fetchEndpoint = (id) => {
		getEndpoint(id);
		openModal();
	};

	return (
		<tr>
			<td>{ep.account.name}</td>
			<td>{ep.username}</td>
			<td>{ep.name}</td>
			<td>{ep._id}</td>
			<td>{ep.userId}</td>
			<td>{ep.apiKey}</td>
			<td>
				<button className='btn btn-sm btn-outline-dark' title='Edit' onClick={() => fetchEndpoint(ep._id)}>
					<i className='fas fa-edit'></i>
				</button>
			</td>
			<td>
				<button className='btn btn-sm btn-outline-danger' title='Delete' onClick={() => deleteEndpoint(ep._id)}>
					<i className='fas fa-trash-alt'></i>
				</button>
			</td>
		</tr>
	);
};

DashEndpointItem.propTypes = {
	getEndpoint: PropTypes.func.isRequired,
	deleteEndpoint: PropTypes.func.isRequired,
	ep: PropTypes.object.isRequired,
	openModal: PropTypes.func.isRequired
};

export default connect(null, {getEndpoint, deleteEndpoint})(DashEndpointItem);
