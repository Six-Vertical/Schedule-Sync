const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Mapping = require('../../models/Mapping');

// @route   GET /mapping
// @desc    Get all mappings
// @access  Admin
router.get('/', async (req, res) => {
	try {
		const mappings = await Mapping.find().populate({path: 'endpoint1 account1 endpoint2 account2'});

		if (!mappings) {
			return res.status(404).json({success: false, mappings: `Mappings could not be found, please try again`});
		}

		if (mappings.length === 0) {
			return res.json({success: true, mappings: []});
		}

		res.json({success: true, count: mappings.length, mappings});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /accounts
// @desc    Get all accounts
// @access  Admin
router.get('/2', async (req, res) => {
	try {
		const mapping = await Mapping.findOne({appointmentType1: '21572963'}).populate({path: 'endpoint1 account1 endpoint2 account2'});

		if (!mapping) {
			return res.status(404).json({success: false, mappings: `Mappings could not be found, please try again`});
		}

		res.json({success: true, mapping});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /mapping/:mapId
// @desc    Get mapping by ID
// @access  Admin
router.get('/:mapId', async (req, res) => {
	try {
		const mapping = await Mapping.findById(req.params.mapId).populate({path: 'endpoint1 account1 endpoint2 account2'});

		if (!mapping) {
			return res.status(404).json({success: false, mapping: `Mapping ${req.params.mapId} not found, please try again`});
		}

		res.json({success: true, mapping});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /mapping
// @desc    Create mapping
// @access  Admin
router.post('/', [check('appointmentType1', 'appointmentType1 is required').not().isEmpty(), check('appointmentType2', 'appointmentType2 is required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, count: errors.array().length, errors: errors.array()});
	}

	const {account1, endpoint1, appointmentType1, appointmentTypeName1, account2, endpoint2, appointmentType2, appointmentTypeName2} = req.body;
	try {
		const newMapping = {
			account1,
			endpoint1,
			appointmentType1,
			appointmentTypeName1,
			account2,
			endpoint2,
			appointmentType2,
			appointmentTypeName2
		};

		const mapping = await Mapping.create(newMapping);

		res.status(201).json({success: true, mapping});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   PUT /mapping/:mapId
// @desc    Update mapping by ID
// @access  Admin
router.put('/:mapId', async (req, res) => {
	try {
		const mapping = await Mapping.findByIdAndUpdate(req.params.mapId, req.body, {
			new: true,
			runValidators: true
		});

		if (!mapping) {
			return res.status(404).json({success: false, mapping: `Mapping ${req.params.mapId} not found, please try again`});
		}

		res.json({success: true, mapping});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   DELETE /mapping/:mapId
// @desc    Delete mapping by ID
// @access  Admin
router.delete('/:mapId', async (req, res) => {
	try {
		const mapping = await Mapping.findById(req.params.mapId);

		if (!mapping) {
			return res.status(404).json({success: false, data: `Mapping ${req.params.mapId} not found, please try again`});
		}

		await mapping.remove();

		res.json({success: true, data: `Mapping ${req.params.mapId} has been removed`});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
