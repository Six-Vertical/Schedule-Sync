const Calendar = require('../models/Calendar');

const determineCalMapping = async (calId) => {
	try {
		const calendar = await Calendar.findOne({$or: [{calendarId1: calId}, {calendarId2: calId}]}).populate({path: 'endpoint1 account1 endpoint2 account2'});
		const dev2Origin = calendar.calendarId2 == calId;

		console.log({calDev2Origin: dev2Origin});

		let mapKey = String(calendar._id);

		console.log({calMapKey: mapKey});

		switch (mapKey) {
			case `${calendar._id}`:
				return {
					calType2: dev2Origin ? calendar.calendarId1 : calendar.calendarId2
				};
			default:
				return 'default';
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = determineCalMapping;
