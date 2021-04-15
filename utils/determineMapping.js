const Mapping = require('../models/Mapping');

const determineMapping = async (aptTypeID) => {
	try {
		const mapping = await Mapping.findOne({appointmentType1: aptTypeID}).populate({path: 'endpoint1 account1 endpoint2 account2'});

		const info = {
			userId2: mapping.endpoint2.userId,
			apiKey2: mapping.endpoint2.apiKey
		};

		let mapKey = mapping._id;

		console.log({mapKey});

		if (mapKey === '607883220268d225705304c9') {
			return {
				...info,
				type2: mapping.appointmentType2
			};
		} else if (mapKey === '607883bad4fddd6d4074cf90') {
			return {
				...info,
				type2: mapping.appointmentType2
			};
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = determineMapping;
