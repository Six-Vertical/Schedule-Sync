const determineBlockMapping = (blockingID) => {
	let mapKey = String(blockingID);

	console.log({blockingMapKey: mapKey});

	switch (mapKey) {
		case '5398976':
			return {
				altBookCalID: '5398686'
			};
		case '5399067':
			return {
				altBookCalID: '5398696'
			};
		case '5398990':
			return {
				altBookCalID: '5398672'
			};
		default:
			return 'default';
	}
};

module.exports = determineBlockMapping;
