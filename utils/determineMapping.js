const Mapping = require('../models/Mapping');
const Calendar = require('../models/Calendar');

const determineMapping = async (aptTypeID, calID) => {
	const mapping = await Mapping.findById(aptTypeID);

	let mapKey = mapping._id;

	switch (mapKey) {
		case '20881507':
			return '21637344';
		case '21572963':
			return '21637324';
	}
};

module.exports = determineMapping;
