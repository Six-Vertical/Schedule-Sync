const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Block = require('../../models/Block');
const Calendar = require('../../models/Calendar');
const Endpoint = require('../../models/Endpoint');

// @route   GET /blocks
// @desc    Get all accounts
// @access  Admin
router.get('/', async (req, res) => {
	try {
		const blocks = await Block.find();

		if (!blocks) {
			return res.status(404).json({success: false, message: `Blocks not found, please try again`});
		}

		if (blocks.length === 0) {
			return res.json({success: true, message: `No blocks have been recorded, add one to get started!`});
		}

		res.json({success: true, count: blocks.length, blocks});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
