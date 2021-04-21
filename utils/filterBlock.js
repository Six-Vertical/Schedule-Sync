const request = require('request');

const filterBlock = (block) => {
	request.get(`http://localhost:5000/api/v1/acuity/blocks/single/ma/${block.id}`, {method: 'GET'}, (err, response, block) => {
		console.log({block});

		if (!block) {
			console.log('There is no block');
			return true;
		} else {
			console.log('This block does exist');
			return false;
		}
	});
};

module.exports = filterBlock;
