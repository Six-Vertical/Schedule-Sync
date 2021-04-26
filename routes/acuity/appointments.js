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

//////////////////////////////////////// CREATE //////////////////////////////////

// @route   POST /api/v1/acuity/appointments/create
// @acuity  POST /appointments/appointments
// @desc    Create sibling appointment ** Dev1 => Dev1
// @access  Private
router.post(`/create`, async (req, res) => {
	console.log(req.body, 'REQ.BODY'.america.bold);
	console.log(req.headers, 'REQ.HEADERS'.green.bold);

	try {
		const mappingKey = await determineMapping(req.body.appointmentTypeID);
		const calMappingKey = await determineCalMapping(req.body.calendarID);

		if (mappingKey == undefined || calMappingKey == undefined) {
			console.log({mappingKey, calMappingKey});
			res.status(400).json({success: false, message: `Appointment-Type Mapping Key (${mappingKey}) and/or Calendar Mapping Key (${calMappingKey}) are undefined. Please check endpoints, mappings, and calendars for up-to-date information.`});
		} else {
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

					const olderSibID = apt.forms.find((form) => form.id === 1701777).values.find((val) => val.fieldID === 9678748).value;
					const youngerSibID = apt.forms.find((form) => form.id === 1701777).values.find((val) => val.fieldID === 9678744).value;

					console.log({olderSibID, youngerSibID});

					if (olderSibID === '' && youngerSibID === '') {
						// BRAND NEW
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
									id: 9678751, //Dev2 fieldID (Older Sibling ID)
									value: apt.id
								}
							]
						};

						console.log({apt1: apt});

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
							console.log({reqBodyID: req.body.id, aptId: apt.id, bodyId: body.id});

							const updatedBody = JSON.parse(body);

							console.log(typeof body);
							console.log(typeof JSON.parse(body));
							console.log({realBody: body});
							console.log({updatedBody: updatedBody.id});
							if (err) {
								console.dir(err);
								return;
							}
							console.dir('status code', rez.statusCode);

							// Dev1 - #3
							const data2 = {
								fields: [
									{
										id: 9678744, // Dev1 Field ID (Younger Sibling ID)
										value: updatedBody.id
									}
								]
							};

							const options2 = {
								headers: {'content-type': 'application/json'},
								url: `https://acuityscheduling.com/api/v1/appointments/${apt.id}`,
								auth: {
									user: process.env.ACUITY_USER_ID_DEV_1,
									password: process.env.ACUITY_API_KEY_DEV_1
								},
								body: JSON.stringify(data2)
							};

							requesting.put(options2, function (x, y, z) {
								console.log({typeOfZ: typeof z});
								console.log({z});

								if (x) {
									console.log({x});
									return;
								}

								res.status(200).json({success: true, body: z});
							});
						});
					} else {
						// ALREADY A SIBLING
						console.log('Already a sibling');
						res.json({success: true, message: 'The original appointment already has a sibling.'});
					}
				}
			);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /api/v1/acuity/appointments/create/d2
// @acuity  POST /appointments/appointments
// @desc    Create sibling appointments ** Dev2 => Dev1 **
// @access  Private
router.post(`/create/d2`, async (req, res) => {
	console.log(req.body, 'REQ.BODY'.america.bold);
	console.log(req.headers, 'REQ.HEADERS'.green.bold);

	try {
		const mappingKey = await determineMapping(req.body.appointmentTypeID);
		const calMappingKey = await determineCalMapping(req.body.calendarID);

		if (mappingKey === '' || calMappingKey === '') {
			console.log({mappingKey, calMappingKey});
			res.status(400).json({success: false, message: `Appointment-Type Mapping Key (${mappingKey}) and/or Calendar Mapping Key (${calMappingKey}) are undefined. Please check endpoints, mappings, and calendars for up-to-date information.`});
		} else {
			console.log(mappingKey);
			console.log({calMappingKey});

			// Dev2 - #1
			acuityDev2.request(
				`/appointments/${req.body.id}`,
				{
					method: 'GET'
				},
				(err, rez, apt) => {
					if (apt.email == '') {
						apt.email = 'dev2@moveamerica.us';
					}

					const olderSibID = apt.forms.find((form) => form.id === 1708418).values.find((val) => val.fieldID === 9678751).value;
					const youngerSibID = apt.forms.find((form) => form.id === 1708418).values.find((val) => val.fieldID === 9678752).value;

					console.log({olderSibID, youngerSibID});

					if (olderSibID === '' && youngerSibID === '') {
						// BRAND NEW
						const formattedTime = apt.datetime.split('T')[1];
						const formattedDate = apt.datetime.split('T')[0];

						// Dev1 - #2
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
									id: 9678748, // Dev1 Field ID (Older Sibling ID)
									value: apt.id
								}
							]
						};

						console.log({aptDev2: apt});

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
							console.log({reqBodyID: req.body.id, aptId: apt.id, bodyId: body.id});

							const updatedBody = JSON.parse(body);

							console.log(typeof body);
							console.log(typeof JSON.parse(body));
							console.log({realBody: body});
							console.log({updatedBody: updatedBody.id});
							if (err) {
								console.dir(err);
								return;
							}
							console.dir('status code', rez.statusCode);

							// Dev2 - #3
							if (updatedBody.id == undefined) {
								return res.json({success: true, message: 'Dev2 ID not updated'});
							} else {
								const data3 = {
									fields: [
										{
											id: 9678752, // Dev2 Field ID (Younger Sibling ID)
											value: updatedBody.id
										}
									]
								};

								const options3 = {
									headers: {'content-type': 'application/json'},
									url: `https://acuityscheduling.com/api/v1/appointments/${apt.id}`,
									auth: {
										user: process.env.ACUITY_USER_ID_DEV_2,
										password: process.env.ACUITY_API_KEY_DEV_2
									},
									body: JSON.stringify(data3)
								};

								requesting.put(options3, function (x, y, z) {
									console.log({typeOfZ: typeof z});
									console.log({z});

									if (x) {
										console.log({x});
										return;
									}

									res.status(200).json({success: true, body: z});
								});
							}
						});
					} else {
						// ALREADY A SIBLING
						console.log('Already a sibling');
						res.json({success: true, message: 'The original appointment already has a sibling.'});
					}
				}
			);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

//////////////////////////////////////// CANCEL //////////////////////////////////

// @route   POST /api/v1/acuity/appointments/cancel
// @acuity  PUT /appointments/:aptID/cancel
// @desc    Cancel sibling appointment ** Dev1 => Dev2 **
// @access  Private
router.post('/cancel', async (req, res) => {
	console.log({headers: req.headers, body: req.body});

	try {
		acuity.request(`/appointments/${req.body.id}`, {method: 'GET'}, (error, rez, apt) => {
			if (error) {
				console.log({error});
				return;
			}

			console.log({apt1: apt});

			const olderSibID = apt.forms.find((form) => form.id === 1701777).values.find((val) => val.fieldID === 9678748).value;
			const youngerSibID = apt.forms.find((form) => form.id === 1701777).values.find((val) => val.fieldID === 9678744).value;

			if (youngerSibID === '') {
				console.log(`No sibling to be deleted`);

				res.status(200).json({success: true, message: `No sibling to be deleted.`});
			} else {
				const options = {
					headers: {'content-type': 'application/json'},
					url: `https://acuityscheduling.com/api/v1/appointments/${youngerSibID}/cancel`,
					auth: {
						user: process.env.ACUITY_USER_ID_DEV_2,
						password: process.env.ACUITY_API_KEY_DEV_2
					}
				};

				requesting.put(options, (e, r, b) => {
					if (e) {
						console.log({error: e});
						return;
					}

					res.json({success: true, body: b});
				});
			}
		});

		// acuity.request(`/appointments/${req.body.id}`, {method: 'GET'}, (error, rez, apt) => {
		// 	if (error) {
		// 		console.log({error});
		// 		return;
		// 	}

		// 	const siblingId = block.forms.find((form) => form.id === 1701777).values.find((val) => val.fieldID === 9425936).value;

		// 	if (!siblingId) {
		// 		return res.status(404).json({success: false, siblingId});
		// 	} else {
		// 		const options = {
		// 			headers: {'content-type': 'application/json'},
		// 			url: `https://acuityscheduling.com/api/v1/appointments/${siblingId}/cancel`,
		// 			auth: {
		// 				user: process.env.ACUITY_USER_ID_DEV_2,
		// 				password: process.env.ACUITY_API_KEY_DEV_2
		// 			}
		// 		};

		// 		requesting.put(options, () => {});
		// 	}
		// });
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /api/v1/acuity/appointments/cancel/d2
// @acuity  PUT /appointments/:aptID/cancel
// @desc    Cancel sibling appointment ** Dev2 => Dev1 **
// @access  Admin
router.post('/cancel/d2', async (req, res) => {
	try {
		acuityDev2.request(`/appointments/${req.body.id}`, {method: 'GET'}, (error, rez, apt) => {
			if (error) {
				console.log({error});
				return;
			}

			console.log({apt2: apt});

			const olderSibID = apt.forms.find((form) => form.id === 1708418).values.find((val) => val.fieldID === 9678751).value;
			const youngerSibID = apt.forms.find((form) => form.id === 1708418).values.find((val) => val.fieldID === 9678752).value;

			if (youngerSibID === '') {
				console.log(`No sibling to be deleted`);

				res.status(200).json({success: true, message: `No sibling to be deleted.`});
			} else {
				const options = {
					headers: {'content-type': 'application/json'},
					url: `https://acuityscheduling.com/api/v1/appointments/${youngerSibID}/cancel`,
					auth: {
						user: process.env.ACUITY_USER_ID_DEV_1,
						password: process.env.ACUITY_API_KEY_DEV_1
					}
				};

				requesting.put(options, (e, r, b) => {
					if (e) {
						console.log({error: e});
						return;
					}

					res.json({success: true, body: b});
				});
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

//////////////////////////////////////// RESCHEDULE //////////////////////////////////

// @route   POST /api/v1/acuity/appointments/reschedule
// @acuity  PUT /appointments/:aptID/reschedule
// @desc    Reschedule sibling appointment ** Dev1 => Dev2 **
// @access  Private
router.post('/reschedule', async (req, res) => {
	console.log({body: req.body, headers: req.headers});

	try {
		acuity.request(`/appointments/${req.body.id}`, {method: 'GET'}, (error, rez, apt) => {
			if (error) {
				console.log(error);
				return;
			}

			const data = {
				datetime: apt.datetime
			};

			const options = {
				url: `https://acuityscheduling.com/api/v1/appointments/$${req.body.id}/cancel?admin=true`,
				auth: {
					user: process.env.ACUITY_USER_ID_DEV_2,
					password: process.env.ACUITY_API_KEY_DEV_2
				},
				body: JSON.stringify(data)
			};

			requesting.put(options, (e, r, b) => {
				if (e) {
					console.error(e);
					return;
				}

				console.log({b});
			});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

// @route   POST /api/v1/acuity/appointments/reschedule/d2
// @acuity  PUT /appointments/:aptID/reschedule
// @desc    Reschedule sibling appointment ** Dev2 => Dev1 **
// @access  Admin
router.post('/reschedule/d2', async (req, res) => {
	try {
		res.send('Index');
	} catch (err) {
		console.error(err);
		res.status(500).json({success: false, data: 'Server Error'});
	}
});

module.exports = router;
