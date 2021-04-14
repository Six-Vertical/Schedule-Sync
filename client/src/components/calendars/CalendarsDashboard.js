import React, {useRef, Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCalendars, clearCalendar} from '../../actions/calendar';
import {clearEndpoint} from '../../actions/endpoint';
import ModalWrapper from '../layout/ModalWrapper';
import CreateCalendarForm from './CreateCalendarForm';
import Calendars from './Calendars';

const CalendarsDashboard = ({calendar: {calendars, loading, error}, getCalendars, clearCalendar, clearEndpoint}) => {
	useEffect(() => {
		if (calendars.length === 0) {
			getCalendars();
		}
	}, [getCalendars, calendars.length, calendars]);

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
	getCalendars: PropTypes.func.isRequired,
	clearCalendar: PropTypes.func.isRequired,
	clearEndpoint: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	calendar: state.calendar
});

export default connect(mapStateToProps, {getCalendars, clearCalendar, clearEndpoint})(CalendarsDashboard);
