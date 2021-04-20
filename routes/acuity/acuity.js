const express = require('express');
const router = express.Router();
const acuity = require('../../config/acuity');
const acuityDev2 = require('../../config/acuity2');
const Acuity2 = require('acuityscheduling');
const requesting = require('request');
const determineMapping = require('../../utils/determineMapping');
const determineCalMapping = require('../../utils/determineCalMapping');
const determineBlockMapping = require('../../utils/determineBlockMapping');
const createMultipleBlocks = require('../../utils/createMultipleBlocks');
const existingBlock = require('../../middleware/existingBlock');

// @route   GET /api/v1/acuity/appointments
// @acuity  GET /appointments
// @desc    Get All Appointments
// @access  Public
router.get('/appointments', async (req, res) => {
	try {
		acuity.request(`/appointments`, (error, rez, appointments) => {
			if (error) console.error(error);
			res.json({success: true, count: appointments.length, appointments});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /api/v1/acuity/appointments
// @acuity  GET /appointments/:id
// @desc    Get All Appointments
// @access  Public
router.get('/appointments/:aptId', async (req, res) => {
	try {
		acuity.request(`/appointments/${req.params.aptId}`, (error, rez, appointment) => {
			if (error) console.error(error);
			res.json({success: true, appointment});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /api/v1/acuity/appointments
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

// @route   POST /api/v1/acuity/appointments
// @acuity  POST /appointments
// @desc    Create an appointment
// @access  Private
router.post(`/appointments`, async (req, res) => {
	console.log(req.body, 'REQ.BODY'.america.bold);
	console.log(req.headers, 'REQ.HEADERS'.green.bold);

	try {
		acuity.request(
			`/appointments`,
			{
				method: 'POST',
				body: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					appointmentTypeID: 21295221,
					datetime: '2021-04-15T09:00:00-0700',
					fields: [
						{
							id: 9460741,
							value: req.body.id
						}
					]
				}
			},
			(error, rez, appointment) => {
				if (error) {
					console.log('ERROR');
					console.error(error);
					console.log(res);
					return res.status(400).json({success: false, data: `ERROR - /appointments - POST`});
				}
				console.log(appointment, 'RES - APPOINTMENT'.bgYellow.bold);

				res.json(appointment);
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   PUT /api/v1/acuity/appointments/:aptId
// @acuity  PUT /appointments/:id
// @desc    Get All Appointments
// @access  Public
router.put('/appointments/:aptId', async (req, res) => {
	try {
		acuity.request(`/appointments/${req.params.aptId}`, {method: 'PUT', body: req.body}, (error, rez, appointment) => {
			if (error) res.json({success: false, data: `ERROR - /appointments - PUT`});

			res.json({success: true, appointment});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /api/v1/acuity/client
// @desc    Get All Clients
// @access  Private
router.get('/clients', async (req, res) => {
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

// @route   GET /api/v1/acuity/client
// @desc    Get All Clients
// @access  Private
router.put('/clients', async (req, res) => {
	try {
		acuity.request(`/clients`, {method: 'PUT', body: req.body}, (error, rez, clients) => {
			if (error) res.json({success: false, data: `ERROR - /clients - PUT`});

			res.json({success: true, clients});
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

router.get(`/hmm/:aptId`, async (req, res) => {
	try {
		acuity.request(`/appointments/${req.params.aptId}`, {method: 'GET'}, (err, rez, apt) => {
			res.json(apt);
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /api/v1/acuity/appointments/create
// @acuity  POST /appointments/appointments
// @desc    Create Parent/Child Appointments - This is the route that "syncs the schedules" as they say
// @access  Private
router.post(`/appointments/create`, async (req, res) => {
	console.log(req.body, 'REQ.BODY'.america.bold);
	console.log(req.headers, 'REQ.HEADERS'.green.bold);

	try {
		const mappingKey = await determineMapping(req.body.appointmentTypeID);
		const calMappingKey = await determineCalMapping(req.body.calendarID);

		console.log(mappingKey);
		console.log({calMappingKey});

		acuity.request(
			`/appointments/${req.body.id}`,
			{
				method: 'GET'
			},
			(err, rez, apt) => {
				if (apt.email == '') {
					apt.email = 'dev1@moveamerica.us';
				}

				const formattedTime = apt.datetime.split('T')[1];
				const formattedDate = apt.datetime.split('T')[0];

				data = {
					firstName: apt.firstName,
					lastName: apt.lastName,
					email: apt.email,
					appointmentTypeID: mappingKey.type2,
					calendarID: calMappingKey.calType2,
					datetime: formattedTime == '09:00:00-0700' ? `${formattedDate}T09:00:00-0700` : `${formattedDate}T12:00:00-0700`,
					notes: `This sibling appointment was created automatically with Schedule-Sync`,
					fields: [
						{
							id: 9460741, //Dev2 fieldID
							value: apt.id
						}
					]
				};

				var options = {
					headers: {'content-type': 'application/json'},
					url: 'https://acuityscheduling.com/api/v1/appointments',
					auth: {
						user: mappingKey.userId2,
						password: mappingKey.apiKey2
					},
					body: JSON.stringify(data)
				};

				requesting.post(options, function (err, rez, body) {
					console.log(body);
					if (err) {
						console.dir(err);
						return;
					}
					console.dir('status code', rez.statusCode);
					res.status(201).json({success: true, body});
				});
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /api/v1/acuity/appointments/create/d2
// @acuity  POST /appointments/appointments
// @desc    Create Parent/Child Appointments - This is the route that "syncs the schedules" as they say
// @access  Private
router.post(`/appointments/create/d2`, async (req, res) => {
	console.log(req.body, 'REQ.BODY'.america.bold);
	console.log(req.headers, 'REQ.HEADERS'.green.bold);

	try {
		const mappingKey = await determineMapping(req.body.appointmentTypeID);
		const calMappingKey = await determineCalMapping(req.body.calendarID);

		console.log(mappingKey);
		console.log({calMappingKey});

		acuityDev2.request(
			`/appointments/${req.body.id}`,
			{
				method: 'GET'
			},
			(err, rez, apt) => {
				if (apt.email == '') {
					apt.email = 'dev1@moveamerica.us';
				}

				const formattedTime = apt.datetime.split('T')[1];
				const formattedDate = apt.datetime.split('T')[0];

				data = {
					firstName: apt.firstName,
					lastName: apt.lastName,
					email: apt.email,
					appointmentTypeID: mappingKey.type2,
					calendarID: calMappingKey.calType2,
					datetime: formattedTime == '09:00:00-0700' ? `${formattedDate}T09:00:00-0700` : `${formattedDate}T13:00:00-0700`,
					notes: `This sibling appointment was created automatically with Schedule-Sync`,
					fields: [
						{
							id: 9425936, // Dev1 Sibling Field ID
							value: apt.id
						}
					]
				};

				var options = {
					headers: {'content-type': 'application/json'},
					url: 'https://acuityscheduling.com/api/v1/appointments',
					auth: {
						user: mappingKey.userId2,
						password: mappingKey.apiKey2
					},
					body: JSON.stringify(data)
				};

				requesting.post(options, function (err, rez, body) {
					console.log(body);
					if (err) {
						console.dir(err);
						return;
					}
					console.dir('status code', rez.statusCode);
					res.status(201).json({success: true, body});
				});
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

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

// @route   GET /blocks
// @acuity  GET /blocks
// @desc    Get all blocks
// @access  Admin
router.get('/blocks', existingBlock, async (req, res) => {
	try {
		acuityDev2.request('/blocks', {method: 'GET'}, async (error, rez, blocks) => {
			requesting.get('http://localhost:5000/api/v1/acuity/blocks/ma', {method: 'GET'}, (ee, rr, bod) => {
				if (ee) {
					console.log(ee);
				}

				console.log({bod});
			});

			if (error) {
				console.log(error);
				res.status(400).json({success: false, error});
			}

			const alreadyExists = blocks.filter((bl) => bl.end === '2021-04-24T11:15:00-0700');

			console.log({alreadyExists, count: alreadyExists.length});

			res.json({success: true, count: blocks.length, blocks});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   GET /blocks/ma
// @acuity  GET /blocks
// @desc    Get all blocks
// @access  Admin
router.get('/blocks/ma', existingBlock, async (req, res) => {
	try {
		acuity.request('/blocks', {method: 'GET'}, async (error, rez, blocks) => {
			if (error) {
				console.log(error);
				res.status(400).json({success: false, error});
			}

			const alreadyExists = blocks.filter((bl) => bl.end === '2021-04-24T11:15:00-0700');

			console.log({alreadyExists, count: alreadyExists.length});

			res.json({success: true, count: blocks.length, blocks});
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
router.post('/blocks/main', async (req, res) => {
	console.log({body: req.body, headers: req.headers});

	try {
		acuityDev2.request('/blocks', {method: 'GET'}, (error, rez, blocks) => {
			if (error) {
				console.log(error);
				return res.status(400).json({success: false, error});
			}

			//** SEARCH FOR ALREADY EXISTING **\\

			const endData = createMultipleBlocks(blocks);

			res.json({success: true, blocks: 'All blocks from Dev2 have been synced to Dev1'});
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
router.post('/blocks/create', async (req, res) => {
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
router.post('/blocks', async (req, res) => {
	console.log({headers: req.headers, body: req.body});
	try {
		acuity.request(
			'/blocks',
			{
				method: 'POST',
				body: {
					start: req.body.start,
					end: req.body.end,
					calendarID: req.body.calendarID
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
router.delete('/blocks/:blockId', async (req, res) => {
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
