import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateAccount} from '../../actions/account';

const CreateAccountForm = ({closeModal, updateAccount, account: {account}}) => {
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		userId: '',
		apiKey: ''
	});

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const {name, location, apiKey, userId} = formData;

	const onSubmit = (e) => {
		e.preventDefault();

		if (name === '' || location === '' || apiKey === '' || userId === '  ') {
			alert('Please fill in all fields');
		} else {
			console.log(formData);
			updateAccount();
			closeModal();
		}
	};

	return (
		<Fragment>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Account Name</label>
					<input type='text' name='name' value={name} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='location'>Location</label>
					<input type='text' name='location' value={location} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='userId'>User ID</label>
					<input type='text' name='userId' value={userId} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='apiKey'>API Key</label>
					<input type='text' name='apiKey' value={apiKey} onChange={onChange} />
				</div>
				<input type='submit' className='btn btn-success' value='Update Account' style={{marginRight: '.5rem'}} />
				<button className='btn btn-cancel'>Cancel</button>
			</form>
		</Fragment>
	);
};

CreateAccountForm.propTypes = {
	updateAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	account: state.account
});

export default connect(mapStateToProps, {updateAccount})(CreateAccountForm);
