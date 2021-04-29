import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createMapping, updateMapping, clearMapping, getMappings} from '../../actions/mapping';
import {getAccounts} from '../../actions/account';
import {getEndpoints, getEndpoint, clearEndpoint} from '../../actions/endpoint';
import {miscGetApptTypes, miscClearAll, isLoading} from '../../actions/misc';

const CreateMappingForm = ({createMapping, clearEndpoint, getEndpoint, updateMapping, clearMapping, getMappings, closeModal, getAccounts, getEndpoints, miscGetApptTypes, account: {accounts}, mapping: {mapping, mappings}, endpoint: {endpoints, endpoint}, misc: {loading, appointmentTypes}}) => {
	const [formData, setFormData] = useState({
		account1: '',
		endpoint1: '',
		appointmentType1: '',
		appointmentTypeName1: '',
		account2: '',
		endpoint2: '',
		appointmentType2: '',
		appointmentTypeName2: '',
		edit: false
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
				edit: true
			});
		}
	}, [setFormData, mapping]);

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const {account1, endpoint1, appointmentType1, account2, endpoint2, appointmentType2} = formData;

	const onSubmit = (e) => {
		e.preventDefault();
		if (account1 === '' || endpoint1 === '' || appointmentType1 === '' || account2 === '' || endpoint2 === '' || appointmentType2 === '') {
			alert('Please fill in all fields');
		} else {
			if (mapping !== null && formData.edit) {
				updateMapping(mapping._id, formData);
				getMappings();
				closeModal();
				setTimeout(() => {
					clearMapping();
				}, 400);
				getMappings();
			} else {
				createMapping(formData);
				getMappings();
				closeModal();
				setTimeout(() => {
					clearMapping();
				}, 400);
				getMappings();
			}
		}
	};

	const onChangeEndpoint = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
		if (endpoint === null) {
			getEndpoint(e.target.value);
		}
	};

	const fetchAppointmentTypesInfo = () => {
		if (endpoint === null) {
			return false;
		} else {
			miscGetApptTypes(endpoint.userId, endpoint.apiKey);
		}
	};

	const clearAll1 = () => {
		const desiredAptType = appointmentTypes.filter((apt) => apt.id === +appointmentType1);
		if (desiredAptType.length === 0) {
			return false;
		} else {
			setFormData({...formData, appointmentTypeName1: desiredAptType[0].name});

			clearEndpoint();
		}
	};
	const clearAll2 = () => {
		const desiredAptType = appointmentTypes.filter((apt) => apt.id === +appointmentType2);
		setFormData({...formData, appointmentTypeName2: desiredAptType[0].name});

		clearEndpoint();
	};

	const getSecondInfo = () => {
		if (accounts.length === 0) {
			getAccounts();
		}
	};

	let aptTypeInUse = mappings.map((item) => item.appointmentType1);
	let aptTypeInUse2 = mappings.map((item) => item.appointmentType2);
	let aptTypeFilter = aptTypeInUse.concat(aptTypeInUse2);

	let miscAptTypeFilter = appointmentTypes.filter((miscAptType) => !aptTypeFilter.includes(String(miscAptType.id)));

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
								<select name='account1' autoFocus onFocus={getAccounts} className='form-control' value={account1} onChange={onChange}>
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
								<select disabled={account1 === ''} name='endpoint1' onFocus={getEndpoints} className='form-control' value={endpoint1} onChange={onChangeEndpoint}>
									<option value='Select Endpoint'>Select Endpoint</option>
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
								<label htmlFor='appointmentType1'>Appointment-Type 1</label>
								<select disabled={endpoint1 === ''} className='form-control' name='appointmentType1' value={appointmentType1} onFocus={fetchAppointmentTypesInfo} onChange={onChangeEndpoint} onBlur={clearAll1}>
									<option value='Select Appointment-Type'>Select Appointment-Type</option>
									{loading ? (
										<option>Loading...</option>
									) : (
										miscAptTypeFilter.map((app) => (
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
								<select name='account2' onFocus={getSecondInfo} className='form-control' value={account2} onChange={onChange}>
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
								<select disabled={account2 === ''} name='endpoint2' onFocus={getEndpoints} className='form-control' value={endpoint2} onChange={onChangeEndpoint}>
									<option value='Select Endpoint'>Select Endpoint</option>
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
								<label htmlFor='appointmentType2'>Appointment-Type 2</label>
								<select disabled={endpoint2 === ''} className='form-control' name='appointmentType2' value={appointmentType2} onFocus={fetchAppointmentTypesInfo} onChange={onChangeEndpoint} onBlur={clearAll2}>
									<option value='Select Appointment-Type'>Select Appointment-Type</option>
									{loading || appointmentTypes.length === 0 ? (
										<option>Loading...</option>
									) : (
										appointmentTypes.map((app) => (
											<option key={app.id} value={app.id}>
												{app.name}
											</option>
										))
									)}
								</select>
							</div>
						</div>
					</div>

					<input type='submit' value='Save Endpoint' className='btn btn-primary btn-block' />
				</form>
				<button className='btn btn-light btn-block mt-3' onClick={closeModal}>
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
	miscClearAll: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	account: state.account,
	endpoint: state.endpoint,
	mapping: state.mapping,
	misc: state.misc
});

export default connect(mapStateToProps, {isLoading, createMapping, updateMapping, clearMapping, getMappings, getAccounts, getEndpoints, getEndpoint, clearEndpoint, miscClearAll, miscGetApptTypes})(CreateMappingForm);
