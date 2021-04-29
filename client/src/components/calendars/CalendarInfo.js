import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const CalendarInfo = ({match, calendar: {calendars}}) => {
	const [desiredCal, setDesiredCal] = useState(null);

	useEffect(() => {
		if (calendars.length !== 0) {
			const desiredCalendarInfo = calendars.filter((cal) => cal.calendarId1 === match.params.calendarId);
			setDesiredCal(desiredCalendarInfo[0]);
		} else {
			return false;
		}
	}, [match.params.calendarId, calendars]);

	return (
		<Fragment>
			<Link to='/calendars' className='btn btn-dark my-3'>
				Go Back
			</Link>
			{calendars.length === 0 || desiredCal === null ? (
				<p className='lead'>No calendars - please try again</p>
			) : (
				<ul className='list-group list-group-flush calendar-info-1'>
					<li className='list-group-item mt-3'>
						<strong>Calendar Name:</strong> <span className='ml-3'>{desiredCal.calendarName1}</span>
					</li>
					<li className='list-group-item'>
						<strong>Account: </strong> <span className='ml-3'>{desiredCal.account1.name}</span>
					</li>
					<li className='list-group-item'>
						<strong>Endpoint:</strong> <span className='ml-3'>{desiredCal.endpoint1.name}</span>
					</li>
					<li className='list-group-item'>
						<strong>Calendar Id (External):</strong> <span className='ml-3'>{desiredCal.calendarId1}</span>
					</li>
					<li className='list-group-item'>
						<strong>Email:</strong> <span className='ml-3'>{desiredCal.endpoint1.username}</span>
					</li>
					<li className='list-group-item'>
						<strong>Reply-To:</strong> <span className='ml-3'>{desiredCal.endpoint1.username}</span>
					</li>
					<li className='list-group-item'>
						<strong>Location:</strong> <span className='ml-3'> Need Location Data</span>
					</li>
					<li className='list-group-item'>
						<strong>Timezone:</strong> <span className='ml-3'>{desiredCal.timezone1}</span>
					</li>
					<li className='list-group-item'>
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
