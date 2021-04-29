import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createAnAccount, updateAccount, clearAccount, getAccounts} from '../../actions/account';

const CreateAccountForm = ({closeModal, createAnAccount, updateAccount, clearAccount, getAccounts, account: {account}}) => {
	const [formData, setFormData] = useState({
		name: ''
	});

	useEffect(() => {
		if (account !== null) {
			setFormData({name: account.name});
		}
	}, [setFormData, account]);

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const {name} = formData;

	const onSubmit = (e) => {
		e.preventDefault();

		if (name === '') {
			alert('Please fill in all fields');
		} else {
			if (account !== null) {
				updateAccount(account._id, formData);
				closeModal();
				getAccounts();
				setTimeout(() => {
					clearAccount();
				}, 400);
				getAccounts();
			} else {
				createAnAccount(formData);
				console.log(formData);
				closeModal();
				setTimeout(() => {
					clearAccount();
				}, 400);
			}
		}
	};

	return (
		<Fragment>
			<div className='modal-header'>
				<h5 className='modal-title'>{name === '' ? 'New' : 'Update'} Account</h5>
				<button onClick={closeModal} type='button' className='close' data-dismiss='modal' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>

			<div className='modal-body'>
				<form className='form' onSubmit={onSubmit}>
					<div className='form-group mb-4'>
						<label htmlFor='name'>Account Name</label>
						<input autoFocus type='text' className='form-control' value={name} onChange={onChange} name='name' />
					</div>
					<input type='submit' className='btn btn-primary btn-block' value='Save' />
				</form>
				<button className='btn btn-secondary mt-2 btn-block' onClick={() => closeModal()}>
					Cancel
				</button>
			</div>
		</Fragment>
	);
};

CreateAccountForm.propTypes = {
	createAnAccount: PropTypes.func.isRequired,
	updateAccount: PropTypes.func.isRequired,
	clearAccount: PropTypes.func.isRequired,
	account: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	account: state.account
});

export default connect(mapStateToProps, {createAnAccount, updateAccount, clearAccount, getAccounts})(CreateAccountForm);
