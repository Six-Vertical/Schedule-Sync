const express = require('express');
const router = express.Router();
const acuity = require('../../config/acuity');
const acuityDev2 = require('../../config/acuity2');
const requesting = require('request');
const determineMapping = require('../../utils/determineMapping');
const determineCalMapping = require('../../utils/determineCalMapping');

// @route   GET /api/v1/acuity/appointments
// @acuity  GET /appointments
// @desc    Get All Appointments
// @access  Admin
router.get('/', async (req, res) => {
	try {
		acuityDev2.request(`/appointments?field:9460741=578034326`, (error, rez, appointments) => {
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
// @access  Admin
router.get('/:aptId', async (req, res) => {
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

// @route   PUT /api/v1/acuity/appointments/:aptId
// @acuity  PUT /appointments/:id
// @desc    Get All Appointments
// @access  Admin
router.put('/:aptId', async (req, res) => {
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

// @route   POST /api/v1/acuity/appointments/create
// @acuity  POST /appointments/appointments
// @desc    Create Parent/Child Appointments - This is the route that "syncs the schedules" as they say
// @access  Private
router.post(`/create`, async (req, res) => {
	console.log(req.body, 'REQ.BODY'.america.bold);
	console.log(req.headers, 'REQ.HEADERS'.green.bold);

	try {
		const mappingKey = await determineMapping(req.body.appointmentTypeID);
		const calMappingKey = await determineCalMapping(req.body.calendarID);

		console.log(mappingKey);
		console.log({calMappingKey});

		// Dev 1 - #1
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

				// Dev 2 - #2
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
							value: req.body.id
						}
					]
				};

				console.log({reqBodyID: req.body.id, aptId: apt.id});

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
				});

				// Dev 2 - #3
				const options2 = {
					url: `https://acuityscheduling.com/api/v1/appointments?field:9460741=${apt.id}`,
					auth: {
						user: process.env.ACUITY_USER_ID_DEV_2,
						password: process.env.ACUITY_API_KEY_DEV_2
					}
				};

				requesting.get(options2, (e, r, b) => {
					console.log({b});
					appointments;
					const sibId = b[0].forms.find((form) => form.id === 1708418).values.find((val) => val.fieldID == 9460741).value;

					console.log({sibId});

					if (e) {
						console.error(e);
						return;
					}

					const data2 = {
						fields: [
							{
								id: 9425936,
								value: sibId
							}
						]
					};

					// Dev 1 - #4
					const options3 = {
						url: `https://acuityscheduling.com/api/v1/appointments/${sibId}`,
						auth: {
							user: process.env.ACUITY_USER_ID_DEV_1,
							password: process.env.ACUITY_API_KEY_DEV_1
						},
						body: JSON.stringify(data2)
					};

					requesting.put(options3, (x, y, z) => {
						if (x) {
							console.log({x});
							return;
						}

						res.json({success: true, body: z});
					});
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
router.post(`/create/d2`, async (req, res) => {
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

router.post('/cancel', async (req, res) => {
	console.log({headers: req.headers, body: req.body});

	try {
		acuity.request(`/appointments/${req.body.id}`, {method: 'GET'}, (error, rez, apt) => {
			const dev1OriginCheck = apt.forms.find((form) => form.id === 1701777).values.find((f) => f.fieldID === 9425936).value;

			console.log({dev1OriginCheck});

			if (dev1OriginCheck === '') {
				console.log({dev1IsParent: 'Dev1 is Parent'});

				// DEV1 IS PARENT
				acuityDev2.request(`/appointments?field:9460741=${dev1OriginCheck}`, {method: 'GET'}, (er, re, bo) => {
					if (er) {
						console.log(er);
						return res.status(400).json({success: false, error: er});
					}

					console.log({bo});

					const options2 = {
						url: `https://acuityscheduling.com/api/v1/appointments/$${bo.appointments[0].id}/cancel?admin=true`,
						auth: {
							user: process.env.ACUITY_USER_ID_DEV_2,
							password: process.env.ACUITY_API_KEY_DEV_2
						}
					};

					requesting.put(options2, (x, y, z) => {
						if (x) {
							console.log(x);
							return res.status(400).json({success: false, error: x});
						}

						console.log({});

						res.json({success: true, body: z});
					});
				});
			} else {
				// DEV2 IS PARENT
				console.log({dev2IsParent: 'Dev2 is Parent'});

				const options = {
					url: `https://acuityscheduling.com/api/v1/appointments/$${dev1OriginCheck}/cancel?admin=true`,
					auth: {
						user: process.env.ACUITY_USER_ID_DEV_2,
						password: process.env.ACUITY_API_KEY_DEV_2
					}
				};

				requesting.put(options, (errr, rex, bod) => {
					if (errr) {
						console.log(errr);
						return res.status(400).json({success: false, error: errr});
					}

					res.json({success: true, body: bod});
				});
			}

			const options = {
				method: 'PUT',
				url: `https://acuityscheduling.com/api/v1/appointments/$${req.body.id}/cancel?admin=true`,
				auth: {
					user: process.env.ACUITY_USER_ID_DEV_2,
					password: process.env.ACUITY_API_KEY_DEV_2
				}
			};

			requesting.put(options, (e, rezult, body) => {
				if (e) {
					console.log(e);
					return;
				}

				res.json({success: true, body});
			});
		});
		res.json({success: true, data: 'hey Will'});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
