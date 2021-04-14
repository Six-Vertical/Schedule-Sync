import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCalendar, deleteCalendar} from '../../actions/calendar';
import {Link} from 'react-router-dom';

const CalendarItem = ({getCalendar, deleteCalendar, openModal, cal}) => {
	const fetchCalendarMap = (id) => {
		getCalendar(id);
		openModal();
	};

	return (
		<tr>
			<td>
				<Link to={`/calendars/${cal.calendarId1}`}>{cal.calendarName1}</Link>
			</td>
			<td>{cal.account1.name}</td>
			<td>{cal.endpoint1.name}</td>
			<td>{cal.calendarId1}</td>
			<td>
				<i className='fas fa-long-arrow-alt-right'></i>
			</td>
			<td>
				<Link to={`/calendars/2/${cal.calendarId2}`}>{cal.calendarName2}</Link>
			</td>
			<td>{cal.account2.name}</td>
			<td>{cal.endpoint2.name}</td>
			<td>{cal.calendarId2}</td>
			<td>
				<button className='btn btn-sm btn-outline-dark' title='Edit' onClick={() => fetchCalendarMap(cal._id)}>
					<i className='fas fa-edit'></i>
				</button>
			</td>
			<td>
				<button className='btn btn-sm btn-outline-danger' title='Delete' onClick={() => deleteCalendar(cal._id)}>
					<i className='fas fa-trash-alt'></i>
				</button>
			</td>
		</tr>
	);
};

CalendarItem.propTypes = {
	getCalendar: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	openModal: PropTypes.func.isRequired,
	deleteCalendar: PropTypes.func.isRequired
};

export default connect(null, {getCalendar, deleteCalendar})(CalendarItem);