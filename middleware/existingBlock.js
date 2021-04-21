const request = require('request');
const fetch = require('node-fetch');

const existingBlock = async (req, res, next) => {
	try {
		request.get('http://localhost:5000/api/v1/acuity/blocks/ma', {method: 'GET'}, (error, rez, blocks) => {
			if (error) {
				console.log(error);
				return;
			}

			blocks.map((b) => b.id);

			req.maBlocks = blocks;
			next();
		});

		req.something = 'Hey will, this middleware is working..... :)';
		next();
	} catch (err) {
		console.error(err);
	}
};

module.exports = existingBlock;
