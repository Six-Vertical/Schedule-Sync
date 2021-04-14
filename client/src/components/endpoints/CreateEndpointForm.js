import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createEndpoint, clearEndpoint, getEndpoints, updateEndpoint} from '../../actions/endpoint';
import {getAccounts} from '../../actions/account';

const CreateEndpointForm = ({closeModal, endpoint: {endpoint}, createEndpoint, getEndpoints, clearEndpoint, updateEndpoint, getAccounts, account: {accounts}}) => {
	const [formData, setFormData] = useState({
		account: '',
		name: '',
		username: '',
		userId: '',
		apiKey: ''
	});

	useEffect(() => {
		if (endpoint !== null) {
			setFormData({account: endpoint.account, name: endpoint.name, username: endpoint.username, userId: endpoint.userId, apiKey: endpoint.apiKey});
		}
	}, [setFormData, endpoint]);

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const fetchAccountNames = () => {
		getAccounts();
	};

	const {account, name, username, userId, apiKey} = formData;

	const onSubmit = (e) => {
		e.preventDefault();

		if (name === '' || account === '' || userId === '' || apiKey === '') {
			alert('Please fill in all fields');
		} else {
			if (endpoint !== null) {
				updateEndpoint(endpoint._id, formData);
				getEndpoints();
				closeModal();
				setTimeout(() => {
					clearEndpoint();
				}, 400);
			} else {
				createEndpoint(formData);
				console.log({endpointForm: formData});
				getEndpoints();
				closeModal();
				setTimeout(() => {
					clearEndpoint();
				}, 400);
			}
		}
	};
	return (
		<Fragment>
			<div className='modal-header'>
				<h5 className='modal-title'>{endpoint !== null ? 'Update Endpoint' : 'Create Endpoint'}</h5>
				<button onClick={closeModal} type='button' className='close' data-dismiss='modal' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>

			<div className='modal-body'>
				<form className='form' onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='account'>Account Name</label>
						<select name='account' autoFocus onFocus={fetchAccountNames} className='form-control' onChange={onChange} value={account}>
							<option value='Please Select Account Name'>Please Select Account Name</option>
							{accounts.length === 0 ? (
								<option value={`Not Available`}>Not Available</option>
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
						<label htmlFor='name'>Endpoint Name</label>
						<input type='text' name='name' className='form-control' onChange={onChange} value={name} />
					</div>
					<hr />
					<br />
					<div className='form-group'>
						<label htmlFor='username'>Username</label>
						<input type='text' onChange={onChange} name='username' className='form-control' value={username} />
					</div>
					<div className='form-group'>
						<label htmlFor='userId'>User ID</label>
						<input type='text' name='userId' className='form-control' onChange={onChange} value={userId} />
					</div>
					<div className='form-group'>
						<label htmlFor='apiKey'>API Key</label>
						<input type='text' name='apiKey' className='form-control' onChange={onChange} value={apiKey} />
					</div>
					<input type='submit' value='Save Endpoint' className='btn btn-primary btn-block' />
				</form>
				<button className='btn btn-secondary btn-block mt-2' onClick={() => closeModal()}>
					Cancel
				</button>
			</div>
		</Fragment>
	);
};

CreateEndpointForm.propTypes = {
	endpoint: PropTypes.object.isRequired,
	createEndpoint: PropTypes.func.isRequired,
	clearEndpoint: PropTypes.func.isRequired,
	getAccounts: PropTypes.func.isRequired,
	getEndpoints: PropTypes.func.isRequired,
	updateEndpoint: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	endpoint: state.endpoint,
	account: state.account
});

export default connect(mapStateToProps, {createEndpoint, clearEndpoint, getAccounts, getEndpoints, updateEndpoint})(CreateEndpointForm);
