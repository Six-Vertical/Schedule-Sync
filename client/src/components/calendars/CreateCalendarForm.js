import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCalendars, clearCalendar, updateCalendar, createCalendar} from '../../actions/calendar';
import {getAccounts} from '../../actions/account';
import {getEndpoints, getEndpoint, clearEndpoint} from '../../actions/endpoint';
import {miscGetCalendars, miscGetCalendars2, miscClearAll, isLoading, miscClearCalendar1, miscClearCalendar2} from '../../actions/misc';

const CreateCalendarForm = ({closeModal, createCalendar, updateCalendar, clearEndpoint, clearCalendar, getEndpoint, getCalendars, miscGetCalendars, miscGetCalendars2, miscClearAll, isLoading, miscClearCalendar1, miscClearCalendar2, getAccounts, getEndpoints, calendar: {calendar, calendars}, account: {accounts}, endpoint: {endpoints, endpoint}, misc}) => {
	const [formData, setFormData] = useState({
		account1: '',
		endpoint1: '',
		calendarName1: '',
		calendarId1: '',
		timezone1: '',
		account2: '',
		endpoint2: '',
		calendarName2: '',
		calendarId2: '',
		timezone2: '',
		edit1: false,
		edit2: false
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
				edit1: true,
				edit2: true
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

	const {edit1, edit2, account1, endpoint1, calendarId1, account2, endpoint2, calendarId2, calendarName1, calendarName2} = formData;

	const clearAll1 = () => {
		if (calendarId1 !== '') {
			const desiredCalendarName = misc.calendars.filter((cal) => cal.id === +calendarId1);
			console.log({desiredCalendarName});
			if (desiredCalendarName.length > 0) {
				setFormData({...formData, calendarName1: desiredCalendarName[0].name, timezone1: desiredCalendarName[0].timezone});

				clearEndpoint();
				isLoading();
			}
		}
	};

	const clearAll2 = () => {
		const desiredCalendarName = misc.calendars2.filter((cal) => cal.id === +calendarId2);

		if (desiredCalendarName.length > 0) {
			console.log({d2: desiredCalendarName});

			if (calendarId1 === calendarId2) {
				setFormData({...formData, endpoint2: '', calendarId2: '', calendarName2: '', timezone2: ''});
				alert(`You cannot map the same configuration, please try again.`);
			} else {
				setFormData({...formData, calendarName2: desiredCalendarName[0].name, timezone2: desiredCalendarName[0].timezone});
				clearEndpoint();
				isLoading();
			}
		}
	};

	const getInfo = () => {
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
				miscClearAll();
				setTimeout(() => {
					clearCalendar();
				}, 400);
				getCalendars();
			} else {
				createCalendar(formData);
				closeModal();
				getCalendars();
				miscClearAll();
				setTimeout(() => {
					clearCalendar();
				}, 400);
				getCalendars();
			}
		}

		e.preventDefault();
	};

	const fetchCalendarsInfo = () => {
		if (endpoint !== null) {
			miscGetCalendars(endpoint.userId, endpoint.apiKey);
		}
	};

	const fetchCalendarsInfo2 = () => {
		if (endpoint !== null) {
			miscGetCalendars2(endpoint.userId, endpoint.apiKey);
		}
	};

	const focusEndpoint1 = () => {
		clearEndpoint();
		miscClearCalendar1();
		getEndpoints();
		setFormData({...formData, endpoint1: '', calendarName1: '', calendarId1: '', timezone1: '', edit1: false});
	};
	const focusEndpoint2 = () => {
		clearEndpoint();
		miscClearCalendar2();
		getEndpoints();
		setFormData({...formData, endpoint2: '', calendarName2: '', calendarId2: '', timezone2: '', edit2: false});
	};

	let calInUseFilter = calendars.map((item) => item.calendarId1);
	let calInUseFilter2 = calendars.map((item) => item.calendarId2);
	let calFilter = calInUseFilter.concat(calInUseFilter2);

	let miscCalsFilter = misc.calendars.filter((miscCal) => !calFilter.includes(String(miscCal.id)));
	let miscCalsFilter2 = misc.calendars2.filter((miscCal) => !calFilter.includes(String(miscCal.id)));

	console.log({calFilter});
	console.log({miscCalsFilter});

	const containsEndpoint = endpoints.filter((end) => end.account._id == account1);
	const containsEndpoint2 = endpoints.filter((end) => end.account._id == account2);

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
								<select name='account1' autoFocus className='form-control' value={account1} onChange={onChange} onFocus={getInfo}>
									<option value='Select Account Name'>Select Account Name</option>
									{accounts.length === 0 ? (
										<option value='Not Available'>Not Available</option>
									) : (
										accounts.map((acc) => (
											<option value={acc._id} key={acc._id}>
												{acc.name}
											</option>
										))
									)}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='endpoint1'>Endpoint 1</label>
								<select name='endpoint1' disabled={account1 === ''} onFocus={focusEndpoint1} className='form-control' value={endpoint1} onChange={onChangeEndpoint}>
									<option value=''>Select Endpoint Name</option>
									{endpoints.length === 0 || containsEndpoint.length === 0 ? (
										<option value='Not Available' disabled style={{background: '#d1d1d1'}}>
											Not Available
										</option>
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
								<select disabled={endpoint1 === '' || edit1} name='calendarId1' onFocus={fetchCalendarsInfo} className='form-control' value={calendarId1} onChange={onChange} onBlur={clearAll1}>
									<option value=''>{edit1 ? calendarName1 : `Select Calendar Name`}</option>
									{misc.calendars.length === 0 || miscCalsFilter.length === 0 ? (
										<option value='Not Available' disabled style={{background: '#d1d1d1'}}>
											Not Available
										</option>
									) : (
										miscCalsFilter.map((cal) => (
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
								<select name='account2' disabled={calendarId1 === ''} value={account2} onChange={onChange} className='form-control' onFocus={getInfo}>
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
								<select disabled={account2 === ''} name='endpoint2' value={endpoint2} onChange={onChangeEndpoint} className='form-control' onFocus={focusEndpoint2}>
									<option value=''>Select Endpoint Name</option>
									{endpoints.length === 0 || containsEndpoint2.length === 0 ? (
										<option value='Not Available' disabled style={{background: '#d1d1d1'}}>
											Not Available
										</option>
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
								<select disabled={endpoint2 === '' || edit2} name='calendarId2' value={calendarId2} onChange={onChange} className='form-control' onFocus={fetchCalendarsInfo2} onBlur={clearAll2}>
									<option value=''>{edit2 ? calendarName2 : `Select Calendar Name`}</option>
									{misc.calendars2.length === 0 || miscCalsFilter.length === 0 ? (
										<option value='Not Available' disabled style={{background: '#d1d1d1'}}>
											Not Available
										</option>
									) : (
										miscCalsFilter2.map((cal) => (
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
	miscGetCalendars2: PropTypes.func.isRequired,
	isLoading: PropTypes.func.isRequired,
	miscClearAll: PropTypes.func.isRequired,
	getEndpoint: PropTypes.func.isRequired,
	clearCalendar: PropTypes.func.isRequired,
	clearEndpoint: PropTypes.func.isRequired,
	createCalendar: PropTypes.func.isRequired,
	updateCalendar: PropTypes.func.isRequired,
	miscClearCalendar1: PropTypes.func.isRequired,
	miscClearCalendar2: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	calendar: state.calendar,
	account: state.account,
	endpoint: state.endpoint,
	misc: state.misc
});

export default connect(mapStateToProps, {getCalendars, updateCalendar, createCalendar, clearCalendar, clearEndpoint, getAccounts, getEndpoints, getEndpoint, miscGetCalendars, miscGetCalendars2, miscClearAll, isLoading, miscClearCalendar1, miscClearCalendar2})(CreateCalendarForm);
