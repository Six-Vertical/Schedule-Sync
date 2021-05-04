import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createMapping, updateMapping, clearMapping, getMappings} from '../../actions/mapping';
import {getAccounts} from '../../actions/account';
import {getEndpoints, getEndpoint, clearEndpoint} from '../../actions/endpoint';
import {miscGetApptTypes, miscGetApptTypes2, miscClearApptType1, miscClearApptType2, miscClearAll, isLoading} from '../../actions/misc';

const CreateMappingForm = ({createMapping, miscClearApptType1, miscClearApptType2, clearEndpoint, getEndpoint, updateMapping, clearMapping, getMappings, closeModal, getAccounts, getEndpoints, miscGetApptTypes, miscGetApptTypes2, account: {accounts}, mapping: {mapping, mappings}, endpoint: {endpoints, endpoint}, misc}) => {
	const [formData, setFormData] = useState({
		account1: '',
		endpoint1: '',
		appointmentType1: '',
		appointmentTypeName1: '',
		account2: '',
		endpoint2: '',
		appointmentType2: '',
		appointmentTypeName2: '',
		edit1: false,
		edit2: false
	});

	useEffect(() => {
		if (mapping !== null) {
			setFormData({
				account1: mapping.account1._id,
				endpoint1: mapping.endpoint1._id,
				appointmentType1: mapping.appointmentType1,
				appointmentTypeName1: mapping.appointmentTypeName1,
				account2: mapping.account2._id,
				endpoint2: mapping.endpoint2._id,
				appointmentType2: mapping.appointmentType2,
				appointmentTypeName2: mapping.appointmentTypeName2,
				edit1: true,
				edit2: true
			});
		}
	}, [setFormData, mapping]);

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const onChangeEndpoint = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
		if (endpoint === null || endpoint1 !== '' || endpoint2 !== '') {
			getEndpoint(e.target.value);
		}
	};

	const {account1, endpoint1, appointmentType1, account2, endpoint2, appointmentType2, appointmentTypeName1, appointmentTypeName2, edit1, edit2} = formData;

	const clearAll1 = () => {
		if (appointmentType1 !== '') {
			const desiredAptType = misc.appointmentTypes.filter((apt) => apt.id === +appointmentType1);
			console.log({desiredAptType});
			if (desiredAptType.length > 0) {
				setFormData({...formData, appointmentTypeName1: desiredAptType[0].name});

				clearEndpoint();
				isLoading();
			}
		}
	};

	const clearAll2 = () => {
		const desiredAptType = misc.appointmentTypes2.filter((apt) => apt.id === +appointmentType2);

		if (desiredAptType.length > 0) {
			console.log({a2: desiredAptType});

			if (appointmentType1 === appointmentType2) {
				setFormData({...formData, endpoint2: '', appointmentType2: '', appointmentTypeName2: ''});
				alert('You cannot map the same configuration, please try again.');
			} else {
				setFormData({...formData, appointmentTypeName2: desiredAptType[0].name});
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
		if (account1 === '' || endpoint1 === '' || appointmentType1 === '' || account2 === '' || endpoint2 === '' || appointmentType2 === '') {
			alert('Please fill in all fields');
		} else {
			if (mapping !== null) {
				updateMapping(mapping._id, formData);
				closeModal();
				getMappings();
				miscClearAll();
				setTimeout(() => {
					clearMapping();
				}, 400);
				getMappings();
			} else {
				createMapping(formData);
				closeModal();
				getMappings();
				miscClearAll();
				setTimeout(() => {
					clearMapping();
				}, 400);
				getMappings();
			}
		}

		e.preventDefault();
	};

	const fetchAppointmentTypesInfo = () => {
		if (endpoint !== null) {
			miscGetApptTypes(endpoint.userId, endpoint.apiKey);
		}
	};

	const fetchAppointmentTypesInfo2 = () => {
		if (endpoint !== null) {
			miscGetApptTypes2(endpoint.userId, endpoint.apiKey);
		}
	};

	const focusEndpoint = () => {
		clearEndpoint();
		miscClearApptType1();
		getEndpoints();
		setFormData({...formData, endpoint1: '', appointmentType1: '', appointmentTypeName1: '', edit1: false, edit2: false, account2: '', endpoint2: '', appointmentType2: '', appointmentTypeName2: ''});
	};
	const focusEndpoint2 = () => {
		if (endpoint2 !== '') {
			setFormData({...formData, endpoint2: ''});
		}

		clearEndpoint();
		miscClearApptType2();
		getEndpoints();
		setFormData({...formData, endpoint2: '', appointmentType2: '', appointmentTypeName2: '', edit2: false, edit1: false});
	};

	let aptTypeInUse = mappings.map((item) => item.appointmentType1);
	// let aptTypeInUse2 = mappings.map((item) => item.appointmentType2);
	// let aptTypeFilter = aptTypeInUse.concat(aptTypeInUse2);
	let aptTypeFilter = aptTypeInUse;

	let miscAptTypeFilter = misc.appointmentTypes.filter((miscAptType) => !aptTypeFilter.includes(String(miscAptType.id)));
	let miscAptTypeFilter2 = misc.appointmentTypes2.filter((miscAptType) => !aptTypeFilter.includes(String(miscAptType.id)));

	console.log({aptTypeFilter});
	console.log({miscAptTypeFilter});

	const containsEndpoint = endpoints.filter((end) => end.account._id === account1);
	const containsEndpoint2 = endpoints.filter((end) => end.account._id === account2);

	return (
		<div className='create-mapping'>
			<div className='modal-header'>
				<h5 className='modal-title'>{mapping !== null ? 'Edit Appointment-Type Mapping' : 'Create Appointment-Type Mapping'}</h5>
				<button onClick={closeModal} type='button' className='close' data-dismiss='modal' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>

			<div className='modal-body'>
				<form className='form' onSubmit={onSubmit}>
					<div className='d-flex'>
						<div style={{marginRight: '2.2rem'}}>
							<div className='form-group'>
								<label htmlFor='account1'>Account 1</label>
								<select name='account1' autoFocus onFocus={getInfo} className='form-control' value={account1} onChange={onChange}>
									<option value='Select Account Name'>Select Accout Name</option>
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
								<label htmlFor='endpoint1'>Endpoint 1</label>
								<select disabled={account1 === ''} name='endpoint1' onFocus={focusEndpoint} className='form-control' value={endpoint1} onChange={onChangeEndpoint}>
									<option value='Select Endpoint'>Select Endpoint</option>
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
								<label htmlFor='appointmentType1'>Appointment-Type 1</label>
								<select disabled={endpoint1 === '' || edit1} className='form-control' name='appointmentType1' value={appointmentType1} onFocus={fetchAppointmentTypesInfo} onChange={onChange} onBlur={clearAll1}>
									<option value=''>{edit1 ? appointmentTypeName1 : `Select Appointment-Type`}</option>
									{misc.appointmentTypes.length === 0 ? (
										<option value='Not Available' disabled style={{background: '#d1d1d1'}}>
											Not Available
										</option>
									) : (
										misc.appointmentTypes.map((app) => (
											<option key={app.id} value={app.id}>
												{app.name}
											</option>
										))
									)}
								</select>
							</div>
						</div>
						<div>
							<div className='form-group'>
								<label htmlFor='account2'>Account 2</label>
								<select name='account2' disabled={appointmentType1 === ''} onFocus={getInfo} className='form-control' value={account2} onChange={onChange}>
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
								<select disabled={account2 === ''} name='endpoint2' onFocus={focusEndpoint2} className='form-control' value={endpoint2} onChange={onChangeEndpoint}>
									<option value=''>Select Endpoint</option>
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
								<label htmlFor='appointmentType2'>Appointment-Type 2</label>
								<select disabled={endpoint2 === '' || edit2} className='form-control' name='appointmentType2' value={appointmentType2} onFocus={fetchAppointmentTypesInfo2} onChange={onChange} onBlur={clearAll2}>
									<option value=''>{edit2 ? appointmentTypeName2 : `Select Appointment-Type`}</option>
									{misc.appointmentTypes2.length === 0 || miscAptTypeFilter2.length === 0 ? (
										<option value='Not Available' disabled style={{background: '#d1d1d1'}}>
											Not Available
										</option>
									) : (
										misc.appointmentTypes2.map((app) => (
											<option key={app.id} value={app.id}>
												{app.name}
											</option>
										))
									)}
								</select>
							</div>
						</div>
					</div>

					<input type='submit' value='Save Appointment-Type Mapping' className='btn btn-primary mt-2' />
				</form>
				<button className='btn btn-dark mt-2' onClick={closeModal}>
					Cancel
				</button>
			</div>
		</div>
	);
};

CreateMappingForm.propTypes = {
	createMapping: PropTypes.func.isRequired,
	updateMapping: PropTypes.func.isRequired,
	clearMapping: PropTypes.func.isRequired,
	getMappings: PropTypes.func.isRequired,
	getAccounts: PropTypes.func.isRequired,
	getEndpoints: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	clearEndpoint: PropTypes.func.isRequired,
	miscClearAll: PropTypes.func.isRequired,
	miscGetApptTypes: PropTypes.func.isRequired,
	miscGetApptTypes2: PropTypes.func.isRequired,
	miscClearApptType1: PropTypes.func.isRequired,
	miscClearApptType2: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	account: state.account,
	endpoint: state.endpoint,
	mapping: state.mapping,
	misc: state.misc
});

export default connect(mapStateToProps, {isLoading, miscClearApptType1, miscClearApptType2, createMapping, updateMapping, clearMapping, getMappings, getAccounts, getEndpoints, getEndpoint, clearEndpoint, miscClearAll, miscGetApptTypes, miscGetApptTypes2})(CreateMappingForm);
