const acuity = require('../config/acuity');

const existingBlock = async () => {
	try {
		const answer = acuity.request('/blocks', {method: 'GET'}, async (error, rez, blocks) => {
			if (error) {
				console.error(err);
			}
			// console.log({rez});

			return blocks;
		});
	} catch (err) {
		console.error(err);
	}
};

console.log(existingBlock());

module.exports = existingBlock;
