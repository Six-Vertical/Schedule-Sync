const Mapping = require('../models/Mapping');

const determineMapping = async (aptTypeID) => {
	try {
		const mapping = await Mapping.findOne({$or: [{appointmentType1: aptTypeID}, {appointmentType2: aptTypeID}]}).populate({path: 'endpoint1 account1 endpoint2 account2'});
		const dev2Origin = mapping.appointmentType2 == aptTypeID;

		console.log({dev2Origin});

		const info = {
			userId2: dev2Origin ? mapping.endpoint1.userId : mapping.endpoint2.userId,
			apiKey2: dev2Origin ? mapping.endpoint1.apiKey : mapping.endpoint2.apiKey
		};

		let mapKey = String(mapping._id);

		console.log({apptTypeMapKey: mapKey});

		switch (mapKey) {
			case mapKey:
				return {
					...info,
					type2: dev2Origin ? mapping.appointmentType1 : mapping.appointmentType2
				};
			default:
				return 'default';
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = determineMapping;
