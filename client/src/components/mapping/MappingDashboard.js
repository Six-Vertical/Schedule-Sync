import React, {Fragment, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ModalWrapper from '../layout/ModalWrapper';
import CreateMappingForm from './CreateMappingForm';
import {getMappings, clearMapping} from '../../actions/mapping';
import {getEndpoints, clearEndpoint} from '../../actions/endpoint';
import DashMappings from './DashMappings';

const MappingDashboard = ({clearMapping, clearEndpoint, getEndpoints, getMappings, mapping: {mappings, loading}, endpoint: {endpoints}}) => {
	useEffect(() => {
		if (mappings.length === 0) {
			getMappings();
		}

		if (endpoints.length === 0) {
			getEndpoints();
		}
	}, [getMappings, getEndpoints, mappings.length, endpoints.length]);

	const modalRef = useRef();

	const openModal = () => {
		modalRef.current.openModal();
	};
	const closeModal = () => {
		modalRef.current.close();
		clearMapping();
		clearEndpoint();
	};

	return (
		<Fragment>
			<h2 className='mb-4'>Appointment-Type Mapping</h2>
			<button className='btn btn-success' style={{marginBottom: '1rem'}} onClick={openModal}>
				Create Appointment-Type Mapping
			</button>
			<ModalWrapper ref={modalRef}>
				<CreateMappingForm closeModal={closeModal} />
			</ModalWrapper>
			{mappings.length === 0 && !loading ? <p className='lead'>No Appointment-Type Mappings - add one to get started!</p> : <DashMappings mappings={mappings} openModal={openModal} closeModal={closeModal} />}
		</Fragment>
	);
};

MappingDashboard.propTypes = {
	mapping: PropTypes.object.isRequired,
	endpoint: PropTypes.object.isRequired,
	getMappings: PropTypes.func.isRequired,
	clearMapping: PropTypes.func.isRequired,
	getEndpoints: PropTypes.func.isRequired,
	clearEndpoint: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	mapping: state.mapping,
	endpoint: state.endpoint
});

export default connect(mapStateToProps, {getMappings, clearEndpoint, clearMapping, getEndpoints})(MappingDashboard);
