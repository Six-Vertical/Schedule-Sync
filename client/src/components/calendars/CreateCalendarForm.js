import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCalendars, clearCalendar, updateCalendar, createCalendar} from '../../actions/calendar';
import {getAccounts} from '../../actions/account';
import {getEndpoints, getEndpoint, clearEndpoint} from '../../actions/endpoint';
import {miscGetCalendars} from '../../actions/misc';

const CreateCalendarForm = ({closeModal, createCalendar, updateCalendar, clearEndpoint, clearCalendar, getEndpoint, getCalendars, miscGetCalendars, getAccounts, getEndpoints, calendar: {calendar}, account: {accounts}, endpoint: {endpoints, endpoint}, misc}) => {
	const [formData, setFormData] = useState({
		account1: `${localStorage.getItem('mainAcc')}`,
		endpoint1: '',
		calendarName1: '',
		calendarId1: '',
		timezone1: '',
		account2: '',
		endpoint2: '',
		calendarName2: '',
		calendarId2: '',
		timezone2: '',
		edit: false
	});

	useEffect(() => {
		if (calendar !== null) {
			setFormData({
				account1: calendar.account1,
				endpoint1: calendar.endpoint1,
				calendarName1: calendar.calendarName1,
				calendarId1: calendar.calendarId1,
				timezone1: calendar.timezone1,
				account2: calendar.account2,
				endpoint2: calendar.endpoint2,
				calendarName2: calendar.calendarName2,
				calendarId2: calendar.calendarId2,
				timezone2: calendar.timezone2,
				edit: true
			});
		}
	}, [setFormData, calendar]);

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const onChangeEndpoint = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
		if (endpoint === null) {
			getEndpoint(e.target.value);
		}
	};

	const {account1, endpoint1, calendarId1, account2, endpoint2, calendarId2} = formData;

	const clearAll1 = () => {
		const desiredCalendarName = misc.calendars.filter((cal) => cal.id === +calendarId1);
		setFormData({...formData, calendarName1: desiredCalendarName[0].name, timezone1: desiredCalendarName[0].timezone});

		clearEndpoint();
	};
	const clearAll2 = () => {
		const desiredCalendarName = misc.calendars.filter((cal) => cal.id === +calendarId2);
		if (!desiredCalendarName) {
			alert('Please try again');
		} else {
			setFormData({...formData, calendarName2: desiredCalendarName[0].name, timezone2: desiredCalendarName[0].timezone});
		}
	};

	const getSecondInfo = () => {
		if (accounts.length === 0) {
			getAccounts();
		}
	};

	const onSubmit = (e) => {
		if (account1 === '' || endpoint1 === '' || calendarId1 === '' || account2 === '' || endpoint2 === '' || calendarId2 === '') {
			alert('Please fill in all fields');
		} else {
			if (calendar !== null) {
				updateCalendar(calendar._id, formData);
				closeModal();
				getCalendars();
				setTimeout(() => {
					clearCalendar();
				}, 400);
			} else {
				createCalendar(formData);
				closeModal();
				getCalendars();
				setTimeout(() => {
					clearCalendar();
				}, 400);
			}
		}

		e.preventDefault();
	};

	const fetchCalendarsInfo = () => {
		miscGetCalendars(endpoint.userId, endpoint.apiKey);
	};

	return (
		<div className='create-calendar'>
			<div className='modal-header'>
				<h5 className='modal-title'>{calendar !== null ? 'Edit Calendar Mapping' : 'Create Calendar Mapping'}</h5>
				<button onClick={closeModal} type='button' className='close' data-dismiss='modal' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>

			<div className='modal-body'>
				<form className='form' onSubmit={onSubmit}>
					<div className='d-flex'>
						<div style={{marginRight: '4rem'}}>
							<div className='form-group'>
								<label htmlFor='account1'>Account 1</label>
								<select name='account1' disabled className='form-control' value={account1} onChange={onChange}>
									<option value={account1}>MoveAmerica</option>
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='endpoint1'>Endpoint 1</label>
								<select name='endpoint1' autoFocus onFocus={getEndpoints} className='form-control' value={endpoint1} onChange={onChangeEndpoint}>
									<option value='Select Endpoint Name'>Select Endpoint Name</option>
									{endpoints.length === 0 ? (
										<option value='Not Available'>Not Available</option>
									) : (
										endpoints
											.filter((e) => e.account._id === account1)
											.map((end) => (
												<option key={end._id} value={end._id}>
													{end.name}
												</option>
											))
									)}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='calendarId1'>Calendar 1</label>
								<select disabled={endpoint1 === ''} name='calendarId1' onFocus={fetchCalendarsInfo} className='form-control' value={calendarId1} onChange={onChange} onBlur={clearAll1}>
									<option value='Select Account Name'>Select Calendar Name</option>
									{misc.calendars.length === 0 ? (
										<option value='Not Available'>Not Available</option>
									) : (
										misc.calendars.map((cal) => (
											<option key={cal.id} value={cal.id}>
												{cal.name}
											</option>
										))
									)}
								</select>
							</div>
						</div>
						<div>
							<div className='form-group'>
								<label htmlFor='account2'>Account 2</label>
								<select name='account2' value={account2} onChange={onChange} className='form-control' onFocus={getSecondInfo}>
									<option value='Select Account Name'>Select Account Name</option>
									{accounts.length === 0 ? (
										<option value='Not Available'>Not Available</option>
									) : (
										accounts.map((acc) => (
											<option key={acc._id} value={acc._id}>
												{acc.name}
											</option>
										))
									)}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='endpoint2'>Endpoint 2</label>
								<select disabled={account2 === ''} name='endpoint2' value={endpoint2} onChange={onChangeEndpoint} className='form-control' onFocus={getEndpoints}>
									<option value='Select Endpoint Name'>Select Endpoint Name</option>
									{endpoints.length === 0 ? (
										<option value='Not Available'>Not Available</option>
									) : (
										endpoints
											.filter((e) => e.account._id === account2)
											.map((end) => (
												<option key={end._id} value={end._id}>
													{end.name}
												</option>
											))
									)}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='calendarId2'>Calendar 2</label>
								<select disabled={endpoint2 === ''} name='calendarId2' value={calendarId2} onChange={onChange} className='form-control' onFocus={fetchCalendarsInfo} onBlur={clearAll2}>
									<option value='Select Calendar Name'>Select Calendar Name</option>
									{misc.calendars.length === 0 ? (
										<option value='Not Available'>Not Available</option>
									) : (
										misc.calendars.map((cal) => (
											<option key={cal.id} value={cal.id}>
												{cal.name}
											</option>
										))
									)}
								</select>
							</div>
						</div>
					</div>
					<input type='submit' value='Save Calendar Mapping' className='btn btn-primary btn-block' />
				</form>
				<button className='btn btn-light btn-block mt-3' onClick={closeModal}>
					Cancel
				</button>
			</div>
		</div>
	);
};

CreateCalendarForm.propTypes = {
	calendar: PropTypes.object.isRequired,
	account: PropTypes.object.isRequired,
	endpoint: PropTypes.object.isRequired,
	misc: PropTypes.object.isRequired,
	closeModal: PropTypes.func.isRequired,
	getCalendars: PropTypes.func.isRequired,
	getAccounts: PropTypes.func.isRequired,
	getEndpoints: PropTypes.func.isRequired,
	miscGetCalendars: PropTypes.func.isRequired,
	getEndpoint: PropTypes.func.isRequired,
	clearCalendar: PropTypes.func.isRequired,
	clearEndpoint: PropTypes.func.isRequired,
	createCalendar: PropTypes.func.isRequired,
	updateCalendar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	calendar: state.calendar,
	account: state.account,
	endpoint: state.endpoint,
	misc: state.misc
});

export default connect(mapStateToProps, {getCalendars, updateCalendar, createCalendar, clearCalendar, clearEndpoint, getAccounts, getEndpoints, getEndpoint, miscGetCalendars})(CreateCalendarForm);