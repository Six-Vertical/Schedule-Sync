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

router.post('/delete', async (req, res) => {
	console.log({headers: req.headers, body: req.body});

	try {
		acuity.request(`/appointments/${req.body.id}`, {method: 'GET'}, (error, rez, apt) => {
			const dev1OriginCheck = apt.forms.find((form) => form.id === 1701777).values.find((f) => f.fieldID === 9425936).value;

			if (dev1OriginCheck === '') {
				// Dev1 is the parent appointment
			} else {
				// Dev1 is the child appoiinyment
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
