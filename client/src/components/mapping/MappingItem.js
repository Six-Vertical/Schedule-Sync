import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getMapping, deleteMapping} from '../../actions/mapping';

const MappingItem = ({ma, openModal, closeModal, getMapping, deleteMapping}) => {
	const fetchMapping = (id) => {
		getMapping(id);
		openModal();
	};

	return (
		<tr>
			<td>{ma.account1.name}</td>
			<td>{ma.endpoint1.name}</td>
			<td>
				{ma.appointmentTypeName1}
				<br />({ma.appointmentType1})
			</td>
			<td>
				<i className='fas fa-arrows-alt-h'></i>
			</td>
			<td>{ma.account2.name}</td>
			<td>{ma.endpoint2.name}</td>
			<td>
				{ma.appointmentTypeName2}
				<br />({ma.appointmentType2})
			</td>
			<td>
				<button className='btn btn-sm btn-outline-dark' title='Edit' onClick={() => fetchMapping(ma._id)}>
					<i className='fas fa-edit'></i>
				</button>
			</td>
			<td>
				<button className='btn btn-sm btn-outline-danger' title='Delete' onClick={() => deleteMapping(ma._id)}>
					<i className='fas fa-trash-alt'></i>
				</button>
			</td>
		</tr>
	);
};

MappingItem.propTypes = {
	getMapping: PropTypes.func.isRequired,
	deleteMapping: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getMapping, deleteMapping})(MappingItem);
