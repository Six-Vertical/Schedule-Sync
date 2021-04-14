const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Endpoint = require('../../models/Endpoint');

// @route   GET /endpoints
// @desc    Get all endpoints
// @access  Admin
router.get('/', async (req, res) => {
	try {
		const endpoints = await Endpoint.find().populate({path: 'account', select: 'name'});

		if (!endpoints) {
			return res.status(404).json({success: false, endpoints: 'Endpoints could not be found, please try again'});
		}

		if (endpoints.length === 0) {
			return res.json({success: true, endpoints: []});
		}

		res.json({success: true, count: endpoints.length, endpoints});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /endpoints/:endId
// @desc    Get endpoint by ID
// @access  Admin
router.get('/:endId', async (req, res) => {
	try {
		const endpoint = await Endpoint.findById(req.params.endId);

		if (!endpoint) {
			return res.status(404).json({success: false, endpoint: `Enpoint ${req.params.endId} not found, please try again`});
		}

		res.json({success: true, endpoint});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /endpoints
// @desc    Create endpoint
// @access  Admin
router.post('/', [check('account', 'Account is required').not().isEmpty(), check('name', 'Name is required').not().isEmpty(), check('username', 'Endpoint username is required').not().isEmpty(), check('userId', 'API user ID is required').not().isEmpty(), check('apiKey', 'API key is required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, count: errors.array().length, errors: errors.array()});
	}

	const {account, name, username, userId, apiKey} = req.body;
	try {
		const newEndpoint = {
			account,
			name,
			username,
			userId,
			apiKey
		};

		const endpoint = await Endpoint.create(newEndpoint);

		res.status(201).json({success: true, endpoint});
	} catch (err) {
		if (err.code === 11000) {
			return res.status(400).json({success: false, data: `One of the values already exists in another endpoint, please adjust the values as so they are unique`});
		}

		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   PUT /endpoints/:endId
// @desc    Update endpoint
// @access  Admin
router.put('/:endId', async (req, res) => {
	try {
		const endpoint = await Endpoint.findByIdAndUpdate(req.params.endId, req.body, {
			new: true,
			runValidators: true
		});

		if (!endpoint) {
			return res.status(404).json({success: false, endpoint: `Enpoint ${req.params.endId} not found, please try again`});
		}

		res.json({success: true, endpoint});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   DELETE /endpoints/:endId
// @desc    Delete endpoint
// @access  Admin
router.delete('/:endId', async (req, res) => {
	try {
		const endpoint = await Endpoint.findById(req.params.endId);

		if (!endpoint) {
			return res.status(404).json({success: false, endpoint: `Enpoint ${req.params.endId} not found, please try again`});
		}

		await endpoint.remove();

		res.json({success: true, endpoint: `Endpoint ${req.params.endId} has been removed`});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
