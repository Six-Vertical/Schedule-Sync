const Mapping = require('../models/Mapping');

const determineMapping = async (aptTypeID) => {
	try {
		const mapping = await Mapping.findOne({$or: [{appointmentType1: aptTypeID}, {appointmentType2: aptTypeID}]}).populate({path: 'endpoint1 account1 endpoint2 account2'});

		const info = {
			userId2: mapping.appointmentType2 == aptTypeID ? mapping.endpoint1.userId : mapping.endpoint2.userId,
			apiKey2: mapping.appointmentType2 == aptTypeID ? mapping.endpoint1.apiKey : mapping.endpoint2.apiKey
		};

		let mapKey = String(mapping._id);

		console.log({mapKey});

		switch (mapKey) {
			case '607883220268d225705304c9':
				return {
					...info,
					type2: mapping.appointmentType2 == aptTypeID ? mapping.appointmentType1 : mapping.appointmentType2
				};
			case '607883bad4fddd6d4074cf90':
				return {
					...info,
					type2: mapping.appointmentType2 == aptTypeID ? mapping.appointmentType1 : mapping.appointmentType2
				};
			default:
				return 'default';
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = determineMapping;
