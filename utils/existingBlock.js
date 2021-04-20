const existingBlock = async (block) => {
	try {
		console.log('I dont want to make a copy of an already existing block in Dev1!');
	} catch (err) {
		console.error(err);
	}
};

module.exports = existingBlock;
