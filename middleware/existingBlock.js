const acuity = require('../config/acuity');

const existingBlock = async (req, res, next) => {
	try {
		acuity.request('/blocks', {method: 'GET'}, async (error, rez, blocks) => {
			if (error) {
				console.error(err);
			}
			// console.log({rez});
			// console.log({req, res});

			req.existing = blocks;
			next();
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = existingBlock;
