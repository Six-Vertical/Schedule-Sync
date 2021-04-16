const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Calendar = require('../../models/Calendar');

// @route   GET /calendars
// @desc    Get all calendars
// @access  Admin
router.get('/', async (req, res) => {
	try {
		const calendars = await Calendar.find().populate({path: 'account1 endpoint1 account2 endpoint2'});

		if (!calendars) {
			return res.status(404).json({success: false, data: 'No calendars found, please try again'});
		}

		if (calendars.length === 0) {
			return res.json({success: true, calendars: [], data: `There are no calendars, add one to get started!`});
		}

		res.json({success: true, count: calendars.length, calendars});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /calendars/2
// @desc    Find calendar relationship
// @access  Admin
router.get('/2', async (req, res) => {
	try {
		const calendar = await Calendar.findOne({$or: [{calendarId2: '5398696'}, {calendarId1: '5398696'}]}).populate({path: 'account1 endpoint1 account2 endpoint2'});

		if (!calendar) {
			return res.status(400).json({success: false, data: `Didnt work sorry`});
		}

		res.json({success: true, count: calendar.length, calendar});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /calendars/:calId
// @desc    Get all calendars
// @access  Admin
router.get('/:calId', async (req, res) => {
	try {
		const calendar = await Calendar.findById(req.params.calId);

		if (!calendar) {
			return res.status(404).json({success: false, data: `Calendar ${req.params.calId} not found, please try again`});
		}

		res.json({success: true, calendar});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /calendars
// @desc    Create calendar
// @access  Admin
router.post(
	'/',
	[
		check('account1', 'Account 1 is required').not().isEmpty(),
		check('timezone1', 'Timezone 1 is required').not().isEmpty(),
		check('endpoint1', 'Endpoint 1 is required').not().isEmpty(),
		check('calendarName1', 'Calendar name 1 is required').not().isEmpty(),
		check('calendarId1', 'Calendar ID 1 is required').not().isEmpty(),
		check('account2', 'Account 2 is required').not().isEmpty(),
		check('timezone2', 'Timezone 2 is required').not().isEmpty(),
		check('endpoint2', 'Endpoint 2 is required').not().isEmpty(),
		check('calendarName2', 'Calendar name 2 is required').not().isEmpty(),
		check('calendarId2', 'Calendar ID 2 is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({success: false, count: errors.array().length, errors: errors.array()});
		}

		const {account1, timezone1, endpoint1, calendarName1, calendarId1, account2, timezone2, endpoint2, calendarName2, calendarId2} = req.body;

		try {
			const newCalendar = {
				account1,
				timezone1,
				endpoint1,
				calendarName1,
				calendarId1,
				account2,
				timezone2,
				endpoint2,
				calendarName2,
				calendarId2
			};

			const calendar = await Calendar.create(newCalendar);

			res.status(201).json({success: true, calendar});
		} catch (err) {
			console.error(err);
			res.status(500).json({success: false, data: 'Server Error'});
		}
	}
);

// @route   PUT /calendars/:calId
// @desc    Update calendar by calendar ID
// @access  Admin
router.put('/:calId', async (req, res) => {
	try {
		const calendar = await Calendar.findByIdAndUpdate(req.params.calId, req.body, {
			new: true,
			runValidators: true
		});

		if (!calendar) {
			return res.status(400).json({success: false, data: `Calendar ${req.params.calId} not found, please try again`});
		}

		res.json({success: true, calendar});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   DELETE /calendars/:calId
// @desc    Delete calendar by calendar ID
// @access  Admin
router.delete('/:calId', async (req, res) => {
	try {
		const calendar = await Calendar.findById(req.params.calId);

		if (!calendar) {
			return res.status(400).json({success: false, data: `Calendar ${req.params.calId} not found, please try again`});
		}

		await calendar.remove();

		res.json({success: true, data: `Calendar ${req.params.calId} has been removed`});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
