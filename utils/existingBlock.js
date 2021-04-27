const request = require('request');
const determineCalMapping = require('./determineCalMapping');
const colors = require('colors');

const existingBlock = async (blocksData, endpoint) => {
	try {
		await Promise.all(
			blocksData.map((block) => {
				if (endpoint == 1) {
					const options = {
						url: `http://localhost:5000/api/v1/acuity/blocks/single/${block.id}`,
						auth: {
							user: process.env.ACUITY_USER_ID_DEV_2,
							password: process.env.ACUITY_API_KEY_DEV_2
						}
					};

					request.get(options, (x, y, z) => {
						if (x) {
							console.log({x});
							return;
						}

						if (z.id === block.id || z.status_code === 404) {
							// FOUND
							return false;
						} else {
							// CONTINUE
							const newBlockData = {
								start: block.start,
								end: block.end,
								calendarID: determineCalMapping(block.calendarID).calType2,
								notes: `${block.id}`
							};

							const options2 = {
								headers: {'Content-Type': 'application/json'},
								url: `http://localhost:5000/api/v1/acuity/blocks/main`,
								auth: {
									user: process.env.ACUITY_USER_ID_DEV_2,
									password: process.env.ACUITY_API_KEY_DEV_2
								},
								body: JSON.stringify(newBlockData)
							};

							request.post(options2, (ee, rr, bb) => {
								if ((ee, rr, bb)) {
									if (ee) {
										console.log(ee);
										return;
									}

									console.log({bb});
								}
							});
						}
					});

					//////////////////////////////////////////////////////////////////////////////////
				} else if (endpoint == 2) {
					const options = {
						url: `http://localhost:5000/api/v1/acuity/blocks/single/ma/${block.id}`,
						auth: {
							user: process.env.ACUITY_USER_ID_DEV_1,
							password: process.env.ACUITY_API_KEY_DEV_1
						}
					};

					request.get(options, async (x, y, z) => {
						if (x) {
							console.log({x});
							return;
						}
						console.log({uh: z});

						console.log({zz: JSON.parse(z)});
						const parsedBlock = JSON.parse(z);

						if (parsedBlock.block.notes !== block.id) {
							console.log({zID: parsedBlock.block.id, blockID: block.id, blockCalID: block.calendarID, parsedCalID: parsedBlock.block.calendarID});
							console.log('Didnt go through...'.blue.bold);
							console.log(parsedBlock.block.status_code);

							return false;
						} else {
							console.log({zID: parsedBlock.block.id, blockID: block.id, blockCalID: block.calendarID, parsedCalID: parsedBlock.block.calendarID});

							const correctCalID = await determineCalMapping(block.calendarID).calType2;

							const newBlockData = {
								start: block.start,
								end: block.end,
								calendarID: correctCalID,
								notes: `${block.id}`
							};

							const options2 = {
								headers: {'Content-Type': 'application/json'},
								url: `http://localhost:5000/api/v1/acuity/blocks/main/d2`,
								auth: {
									user: process.env.ACUITY_USER_ID_DEV_1,
									password: process.env.ACUITY_API_KEY_DEV_1
								},
								body: JSON.stringify(newBlockData)
							};

							request.post(options2, (ee, rr, bb) => {
								if ((ee, rr, bb)) {
									if (ee) {
										console.log(ee);
										return;
									}

									console.log({bb});
								}
							});
						}

						// if (parsedBlock.block.id === block.id || z.status_code === 404) {
						// 	// FOUND
						// 	console.log({zID: parsedBlock.block.id, blockID: block.id, blockCalID: block.calendarID, parsedCalID: parsedBlock.block.calendarID});

						// 	return false;
						// } else {
						// 	// CONTINUE
						// 	console.log({zID: parsedBlock.block.id, blockID: block.id, blockCalID: block.calendarID, parsedCalID: parsedBlock.block.calendarID});

						// 	const newBlockData = {
						// 		start: block.start,
						// 		end: block.end,
						// 		calendarID: await determineCalMapping(parsedBlock.block.calendarID).calType2,
						// 		notes: `${block.id}`
						// 	};

						// 	console.log({newBlockData});

						// 	const options2 = {
						// 		headers: {'Content-Type': 'application/json'},
						// 		url: `http://localhost:5000/api/v1/acuity/blocks/main/d2`,
						// 		auth: {
						// 			user: process.env.ACUITY_USER_ID_DEV_1,
						// 			password: process.env.ACUITY_API_KEY_DEV_1
						// 		},
						// 		body: JSON.stringify(newBlockData)
						// 	};

						// 	request.post(options2, (ee, rr, bb) => {
						// 		if ((ee, rr, bb)) {
						// 			if (ee) {
						// 				console.log(ee);
						// 				return;
						// 			}

						// 			console.log({bb});
						// 		}
						// 	});
						// }
					});
				}
			})
		);
	} catch (err) {
		console.error(err);
	}
};

module.exports = existingBlock;
