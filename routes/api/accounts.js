const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Account = require('../../models/Account');
const Mapping = require('../../models/Mapping');
const Endpoint = require('../../models/Endpoint');

// @route   GET /accounts
// @desc    Get all accounts
// @access  Admin
router.get('/', async (req, res) => {
	try {
		const accounts = await Account.find().sort({name: 1});

		if (!accounts) {
			return res.status(404).json({success: false, data: `No accounts could be found, please try again`});
		}

		if (accounts.length === 0) {
			return res.json({success: true, accounts: []});
		}

		res.json({success: true, count: accounts.length, accounts});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /accounts/:accId
// @desc    Get account by account ID
// @access  Admin
router.get('/:accId', async (req, res) => {
	try {
		const account = await Account.findById(req.params.accId);

		if (!account) {
			return res.status(404).json({success: false, data: `Account ${req.params.accId} could not be found, please try again`});
		}

		res.json({success: true, account});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /accounts
// @desc    Create account
// @access  Admin
router.post('/', [check('name', 'Name is required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, count: errors.array().length, errors: errors.array()});
	}

	const {name} = req.body;

	try {
		const newAccount = {
			name
		};

		const account = await Account.create(newAccount);

		res.status(201).json({success: true, account});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   PUT /accounts/:accId
// @desc    Update Account by ID
// @access  Admin
router.put('/:accId', async (req, res) => {
	try {
		const account = await Account.findByIdAndUpdate(req.params.accId, req.body, {
			new: true,
			runValidators: true
		});

		if (!account) {
			return res.status(404).json({success: false, data: `Account ${req.params.accId} could not be found - please try again`});
		}

		res.json({success: true, account});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   DELETE /accounts/:accId
// @desc    Delete account by ID
// @access  Admin
router.delete('/:accId', async (req, res) => {
	try {
		const account = await Account.findById(req.params.accId);

		if (!account) {
			return res.status(404).json({success: false, data: `Account ${req.params.accId} could not be found - please try again`});
		}

		await account.remove();

		res.json({success: true, account: `Account ${req.params.accId} has been removed`});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
