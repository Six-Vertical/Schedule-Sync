import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const CalendarInfo = ({match, calendar: {calendars}}) => {
	const [desiredCal, setDesiredCal] = useState(null);

	useEffect(() => {
		if (calendars.length !== 0) {
			const desiredCalendarInfo = calendars.filter((cal) => cal.calendarId2 === match.params.calendarId);
			setDesiredCal(desiredCalendarInfo[0]);
		} else {
			return false;
		}
	}, [match.params.calendarId, calendars]);

	return (
		<Fragment>
			<h2 className='mb-4'>Calendar Mapping: Child Calendar Information</h2>
			<Link to='/calendars' className='btn btn-dark my-3'>
				Go Back
			</Link>
			{calendars.length === 0 || desiredCal === null ? (
				<p className='lead'>No calendars - please try again</p>
			) : (
				<ul className='list-group list-group-flush calendar-info-2'>
					<li className='list-group-item'>
						<strong>Account: </strong> <span className='ml-3'>{desiredCal.account2.name}</span>
					</li>
					<li className='list-group-item'>
						<strong>Endpoint:</strong> <span className='ml-3'>{desiredCal.endpoint2.name}</span>
					</li>
					<li className='list-group-item mt-5'>
						<strong>Calendar Name:</strong> <span className='ml-3'>{desiredCal.calendarName2}</span>
					</li>
					<li className='list-group-item'>
						<strong>Calendar Id (External):</strong> <span className='ml-3'>{desiredCal.calendarId2}</span>
					</li>
					<li className='list-group-item'>
						<strong>Email:</strong> <span className='ml-3'>{desiredCal.endpoint2.username}</span>
					</li>
					<li className='list-group-item'>
						<strong>Reply-To:</strong> <span className='ml-3'>{desiredCal.endpoint2.username}</span>
					</li>
					<li className='list-group-item'>
						<strong>Location:</strong> <span className='ml-3'> Need Location Data</span>
					</li>
					<li className='list-group-item'>
						<strong>Timezone:</strong> <span className='ml-3'>{desiredCal.timezone2}</span>
					</li>
					<li className='list-group-item mt-5'>
						<strong>Description:</strong> <span className='ml-3'>Need Description Data</span>
					</li>
				</ul>
			)}
		</Fragment>
	);
};

CalendarInfo.propTypes = {
	calendar: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	calendar: state.calendar
});

export default connect(mapStateToProps, {})(CalendarInfo);
