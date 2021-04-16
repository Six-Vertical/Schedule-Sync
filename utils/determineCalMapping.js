const Calendar = require('../models/Calendar');

const determineCalMapping = async (calId) => {
	try {
		const calendar = await Calendar.findOne({calendarId1: calId}).populate({path: 'endpoint1 account1 endpoint2 account2'});

		let mapKey = String(calendar._id);

		console.log({mapKey});

		switch (mapKey) {
			case '607731dc4d8ebe4b80b68640':
				return {
					calType2: calendar.calendarId2
				};
			case '6077327c4d8ebe4b80b68642':
				return {
					calType2: calendar.calendarId2
				};
			case '6077387c00bc061be016de97':
				return {
					calType2: calendar.calendarId2
				};
			default:
				return 'default';
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = determineCalMapping;
