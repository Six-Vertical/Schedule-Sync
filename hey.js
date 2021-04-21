const request = require('request');

request.get(`http://localhost:5000/api/v1/acuity/blocks/single/ma/4308h249741`, {method: 'GET'}, (err, response, block) => {
	console.log(block);
	console.log(response.body.error);

	if (block.error === 'not_found') {
		console.log('There is no block');
		return true;
	} else {
		console.log('This block does exist');
		return false;
	}
});
