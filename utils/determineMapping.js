const Mapping = require('../models/Mapping');

const determineMapping = async (aptTypeID, calID) => {
	try {
		const mapping = await Mapping.findOne({appointmentType1: aptTypeID});

		const info = {
			userId2: mapping.endpoint2.userId,
			apiKey2: mapping.endpoint2.apiKey
		};

		let mapKey = mapping._id;

		switch (mapKey) {
			case '607883220268d225705304c9':
				return {
					...info,
					type2: mapping.appointmentType2
				};
			case '607883bad4fddd6d4074cf90':
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