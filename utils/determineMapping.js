const Mapping = require('../models/Mapping');

const determineMapping = async (aptTypeID) => {
	try {
		const mapping = await Mapping.findOne({$or: [{appointmentType1: aptTypeID}, {appointmentType2: aptTypeID}]}).populate({path: 'endpoint1 account1 endpoint2 account2'});

		const isEqual = mapping.appointmentType2 == aptTypeID;

		const info = {
			userId2: isEqual ? mapping.endpoint1.userId : mapping.endpoint2.userId,
			apiKey2: isEqual ? mapping.endpoint1.apiKey : mapping.endpoint2.apiKey,
			siblingId: isEqual ? 9425936 : 9460741
		};

		let mapKey = String(mapping._id);

		console.log({mapKey});
		console.log({siblingId});

		switch (mapKey) {
			case '607883220268d225705304c9':
				return {
					...info,
					type2: isEqual ? mapping.appointmentType1 : mapping.appointmentType2
				};
			case '607883bad4fddd6d4074cf90':
				return {
					...info,
					type2: isEqual ? mapping.appointmentType1 : mapping.appointmentType2
				};
			default:
				return 'default';
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = determineMapping;
