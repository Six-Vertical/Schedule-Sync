const express = require('express');
const router = express.Router();
const acuity = require('../../config/acuity');
const acuityDev2 = require('../../config/acuity2');
const requesting = require('request');
const determineBlockMapping = require('../../utils/determineBlockMapping');
const createMultipleBlocks = require('../../utils/createMultipleBlocks');
const existingBlock = require('../../utils/existingBlock');
const existingBlockMiddleware = require('../../middleware/existingBlock');

// @route   GET /blocks
// @acuity  GET /blocks
// @desc    Get all blocks
// @access  Admin
router.get('/', async (req, res) => {
	try {
		acuityDev2.request('/blocks', {method: 'GET'}, async (error, rez, blocks) => {
			if (error) {
				console.log(error);
				res.status(400).json({success: false, error});
			}

			existingBlock();

			const alreadyExists = blocks.filter((bl) => bl.end === '2021-04-24T11:15:00-0700');

			console.log({alreadyExists});

			res.json({success: true, count: blocks.length, blocks});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /blocks/ma
// @acuity  GET /blocks
// @desc    Get all MA blocks
// @access  Admin
router.get('/ma', async (req, res) => {
	try {
		acuity.request('/blocks', {method: 'GET'}, async (error, rez, blocks) => {
			if (error) {
				console.log(error);
				res.status(400).json({success: false, error});
			}

			console.log({blocks});

			res.json({success: true, count: blocks.length, blocks});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /blocks/single/:blockID
// @acuity  GET /blocks/:id
// @desc    Get block by ID
// @access  Admin
router.get('/single/:blockID', async (req, res) => {
	try {
		acuityDev2.request(`/blocks/${req.params.blockID}`, {method: 'GET'}, async (error, rez, block) => {
			if (error) {
				console.log(error);
				res.status(400).json({success: false, error});
			}

			res.json({success: true, block});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /blocks/single/ma/:blockID
// @acuity  GET /blocks/:id
// @desc    Get block by ID
// @access  Admin
router.get('/single/ma/:blockID', async (req, res) => {
	try {
		acuity.request(`/blocks/${req.params.blockID}`, {method: 'GET'}, async (error, rez, block) => {
			if (error) {
				console.log(error);
				res.status(400).json({success: false, error});
			}

			res.json({success: true, block});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /blocks/main
// @acuity  POST /blocks
// @desc    Check existing blocks and create them in our environment
// @access  Admin
router.post('/main', async (req, res) => {
	console.log({body: req.body, headers: req.headers});

	try {
		acuityDev2.request('/blocks', {method: 'GET'}, (error, rez, blocks) => {
			if (error) {
				console.log(error);
				return res.status(400).json({success: false, error});
			}

			//** SEARCH FOR ALREADY EXISTING **\\

			createMultipleBlocks(blocks);

			res.status(201).json({success: true, blocks: 'All blocks from Dev2 have been synced to Dev1'});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /blocks/create
// @route   POST /blocks
// @desc    Create sibling block, Dev2 => Dev1
// @access  Admin
router.post('/create', async (req, res) => {
	console.log({body: req.body, headers: req.headers});
	try {
		acuityDev2.request(`/blocks/${req.body.id}`, {method: 'GET'}, (error, rez, block) => {
			console.log({blockFromDev2: block});
			if (error) {
				console.log(error);
			}

			const blockMappingKey = determineBlockMapping(block.calendarID);

			data = {
				start: block.start,
				end: block.end,
				calendarID: blockMappingKey.altBookCalID,
				notes: `This sibling block is related to block ${block.id} and was created automatically with Schedule-Sync`
			};

			var options = {
				headers: {'content-type': 'application/json'},
				url: 'https://acuityscheduling.com/api/v1/blocks',
				auth: {
					user: process.env.ACUITY_USER_ID_DEV_1,
					password: process.env.ACUITY_API_KEY_DEV_1
				},
				body: JSON.stringify(data)
			};

			requesting.post(options, function (errr, rezz, body) {
				if (errr) {
					console.log(errr);
					return;
				}

				res.status(201).json({success: true, body});
			});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /blocks
// @acuity  POST /blocks
// @desc    Create a block
// @access  Admin
router.post('/', async (req, res) => {
	console.log({headers: req.headers, body: req.body});
	try {
		acuity.request(
			'/blocks',
			{
				method: 'POST',
				body: {
					start: req.body.start,
					end: req.body.end,
					calendarID: req.body.calendarID,
					notes: req.body.notes
				}
			},
			(error, rez, block) => {
				if (error) {
					console.log(error);
					res.status(400).json({success: false, error});
				}

				console.log({block});

				res.json({block});
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   DELETE /blocks/:blockId
// @acuity  DELETE /blocks/:blockId
// @desc    Delete block by ID
// @access  Admin
router.delete('/:blockId', async (req, res) => {
	try {
		acuityDev2.request(`/blocks/${req.params.blockId}`, {method: 'DELETE'}, (error, rez, block) => {
			if (error) {
				console.log(error);
				res.status(400).json({success: false, error});
			}

			res.json({success: true, block});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
