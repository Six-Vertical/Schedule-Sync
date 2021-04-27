const express = require('express');
const router = express.Router();
const requesting = require('request');

const options = {
	url: `http://localhost:5000/api/v1/acuity/blocks/main`
};

const getBlocks = () => {
	setInterval(() => {
		try {
			// requesting.post(options, (error, rez, blocks) => {
			// 	if (error) {
			// 		console.log({error});
			// 		return;
			// 	}

			// 	console.log(`Blocks synced: Dev2 => Dev1`);
			// });

			console.log(`Phase 1`);
		} catch (err) {
			console.error(err);
		}
	}, 1000 * 60 * 10);

	setInterval(() => {
		try {
			// requesting.post(options, (error, rez, blocks) => {
			// 	if (error) {
			// 		console.log({error});
			// 		return;
			// 	}

			// 	console.log(`Blocks synced: Dev2 => Dev1`);
			// });

			console.log(`Phase 2`);
			return 'hey';
		} catch (err) {
			console.error(err);
		}
	}, 1000 * 60 * 10);
};

module.exports = getBlocks;
