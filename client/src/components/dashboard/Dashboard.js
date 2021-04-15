import React, {Fragment, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAccounts, clearAccount} from '../../actions/account';
import DashAccounts from './DashAccounts';
import ModalWrapper from '../layout/ModalWrapper';
import CreateAccountForm from './CreateAccountForm';

const Dashboard = ({getAccounts, clearAccount, account: {accounts, loading}}) => {
	const modalRef = useRef();

	useEffect(() => {
		if (accounts.length === 0) {
			getAccounts();
		}
	}, [getAccounts, accounts.length]);

	const openModal = () => {
		modalRef.current.openModal();
	};
	const closeModal = () => {
		modalRef.current.close();
		clearAccount();
	};

	return (
		<Fragment>
			<h2 className='mb-4'>Accounts</h2>
			<button className='btn btn-success' style={{marginBottom: '1rem'}} onClick={openModal}>
				Create Account
			</button>
			<ModalWrapper ref={modalRef}>
				<CreateAccountForm closeModal={closeModal} />
			</ModalWrapper>
			{accounts.length === 0 && !loading ? <p className='lead'>No accounts - add one to get started!</p> : <DashAccounts accounts={accounts} closeModal={closeModal} openModal={openModal} />}
		</Fragment>
	);
};

Dashboard.propTypes = {
	account: PropTypes.object.isRequired,
	getAccounts: PropTypes.func.isRequired,
	clearAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	account: state.account
});

export default connect(mapStateToProps, {getAccounts, clearAccount})(Dashboard);
