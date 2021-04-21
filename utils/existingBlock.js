const request = require('request');

const existingBlock = async () => {
	try {
		request.get('http://localhost:5000/api/v1/acuity/blocks/ma', {method: 'GET'}, async (error, rez, blocks) => {
			if (error) {
				console.log(error);
				return;
			}

			console.log({blocks});

			return blocks;
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = existingBlock;
