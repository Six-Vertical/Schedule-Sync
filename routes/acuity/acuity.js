const express = require('express');
const router = express.Router();
const acuity = require('../../config/acuity');
const Acuity2 = require('acuityscheduling');

// @route   GET /api/v1/acuity/me
// @acuity  GET /me
// @desc    Get All Appointments
// @access  Public
router.get('/me', async (req, res) => {
	try {
		acuity.request(`/me`, (error, rez, info) => {
			if (error) console.error(error);
			res.json({success: true, info});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   PUT /api/v1/acuity/custom/:aptId/cancel
// @acuity  PUT /appointments/:id/cancel
// @desc    Cancel an appointment
// @access  Private
router.put('/custom/:aptId/cancel', async (req, res) => {
	try {
		acuity.request(
			`/appointments/${req.params.aptId}/cancel`,
			{
				method: 'PUT',
				body: req.body
			},
			(error, rez, appointment) => {
				if (error) res.json({success: false, data: `ERROR - /custom/${req.params.aptId} - PUT`});

				res.json({success: true, appointment});
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @route   GET /api/v1/acuity/appointment-types
// @acuity  GET /appointments/appointment-types
// @desc    Get appointment types
// @access  For the admin dashboard
router.get('/appointment-types/:userId/:apiKey', async (req, res) => {
	const acuity2 = Acuity2.basic({userId: req.params.userId, apiKey: req.params.apiKey});

	try {
		acuity2.request('/appointment-types', {method: 'GET'}, (error, rez, aptTypes) => {
			if (error) {
				console.log(error);
				return res.status(400).json({error});
			}

			res.json({success: true, count: aptTypes.length, aptTypes});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /api/v1/acuity/calendars
// @acuity  GET /appointments/calendars
// @desc    Get appointment types
// @access  For the admin dashboard
router.get('/calendars/:userId/:apiKey', async (req, res) => {
	const acuity2 = Acuity2.basic({userId: req.params.userId, apiKey: req.params.apiKey});

	try {
		acuity2.request('/calendars', {method: 'GET'}, (error, rez, cals) => {
			if (error) {
				console.log(error);
				return res.status(400).json({error});
			}

			res.json({success: true, count: cals.length, cals});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
