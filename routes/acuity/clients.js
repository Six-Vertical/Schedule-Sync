const express = require('express');
const router = express.Router();
const acuity = require('../../config/acuity');

// @route   GET /api/v1/acuity/client
// @desc    Get All Clients
// @access  Private
router.get('/', async (req, res) => {
	try {
		acuity.request(`/clients`, {method: 'GET'}, (error, rez, clients) => {
			if (error) res.json({success: false, data: `ERROR - /clients - GET`});

			res.json({success: true, count: clients.length, clients});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
