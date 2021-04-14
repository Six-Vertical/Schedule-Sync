import React, {Fragment, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ModalWrapper from '../layout/ModalWrapper';
import CreateEndpointForm from './CreateEndpointForm';
import DashEndpoints from './DashEndpoints';
import {getEndpoints, clearEndpoint} from '../../actions/endpoint';

const EndpointDashboard = ({getEndpoints, clearEndpoint, endpoint: {endpoints, loading}}) => {
	useEffect(() => {
		if (endpoints.length === 0) {
			getEndpoints();
		}
	}, [getEndpoints]);

	const modalRef = useRef();

	const openModal = () => {
		modalRef.current.openModal();
	};
	const closeModal = () => {
		modalRef.current.close();
		clearEndpoint();
	};

	return (
		<Fragment>
			<h2 className='mb-4'>Endpoints</h2>
			<button className='btn btn-success' style={{marginBottom: '1rem'}} onClick={openModal}>
				Create Endpoint
			</button>
			<ModalWrapper ref={modalRef}>
				<CreateEndpointForm closeModal={closeModal} />
			</ModalWrapper>
			{endpoints.length === 0 && !loading ? <p className='lead'>No endpoints - add one to get started!</p> : <DashEndpoints endpoints={endpoints} openModal={openModal} closeModal={closeModal} />}
		</Fragment>
	);
};

EndpointDashboard.propTypes = {
	endpoint: PropTypes.object.isRequired,
	getEndpoints: PropTypes.func.isRequired,
	clearEndpoint: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	endpoint: state.endpoint
});

export default connect(mapStateToProps, {getEndpoints, clearEndpoint})(EndpointDashboard);
