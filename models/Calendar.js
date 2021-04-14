const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
	account1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	timezone1: {
		type: String,
		required: [true, 'Valid timezone is required']
	},
	endpoint1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Endpoint'
	},
	calendarName1: {
		type: String,
		required: true
	},
	calendarId1: {
		type: String,
		required: true
	},
	account2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	timezone2: {
		type: String,
		required: [true, 'Valid timezone is required']
	},
	endpoint2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Endpoint'
	},
	calendarName2: {
		type: String,
		required: true
	},
	calendarId2: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Calendar', CalendarSchema);
