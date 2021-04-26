const determineBlockMapping = (blockingID) => {
	let mapKey = String(blockingID);

	console.log({blockingMapKey: mapKey});

	switch (mapKey) {
		case '5398686':
			return {
				altBookCalID: '5398976'
			};
		case '5398696':
			return {
				altBookCalID: '5399067'
			};
		case '5398672':
			return {
				altBookCalID: '5398990'
			};
		default:
			return 'default';
	}
};

module.exports = determineBlockMapping;
