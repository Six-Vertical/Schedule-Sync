import React, {useRef, Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCalendars, clearCalendar} from '../../actions/calendar';
import {clearEndpoint, getEndpoints} from '../../actions/endpoint';
import ModalWrapper from '../layout/ModalWrapper';
import CreateCalendarForm from './CreateCalendarForm';
import Calendars from './Calendars';

const CalendarsDashboard = ({calendar: {calendars, loading, error}, endpoint: {endpoints}, getCalendars, clearCalendar, clearEndpoint, getEndpoints}) => {
	useEffect(() => {
		if (calendars.length === 0) {
			getCalendars();
		}

		if (endpoints.length === 0) {
			getEndpoints();
		}
	}, [getCalendars, getEndpoints, calendars.length, endpoints.length]);

	const modalRef = useRef();

	const openModal = () => {
		modalRef.current.openModal();
	};
	const closeModal = () => {
		modalRef.current.close();
		clearCalendar();
		clearEndpoint();
	};

	return (
		<Fragment>
			<h2 className='mb-4'>Calendar Mapping</h2>
			<button className='btn btn-success' onClick={openModal} style={{marginBottom: '1rem'}}>
				Create Calendar Mapping
			</button>
			<ModalWrapper ref={modalRef}>
				<CreateCalendarForm closeModal={closeModal} />
			</ModalWrapper>
			{calendars.length === 0 && !loading ? <p className='lead'>No Calendar Mappings - add one to get started!</p> : <Calendars closeModal={closeModal} openModal={openModal} calendars={calendars} />}
		</Fragment>
	);
};

CalendarsDashboard.propTypes = {
	calendar: PropTypes.object.isRequired,
	endpoint: PropTypes.object.isRequired,
	getCalendars: PropTypes.func.isRequired,
	clearCalendar: PropTypes.func.isRequired,
	clearEndpoint: PropTypes.func.isRequired,
	getEndpoints: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	calendar: state.calendar,
	endpoint: state.endpoint
});

export default connect(mapStateToProps, {getCalendars, clearCalendar, getEndpoints, clearEndpoint})(CalendarsDashboard);
