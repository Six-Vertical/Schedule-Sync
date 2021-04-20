const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
	start: {
		type: String,
		required: true
	},
	end: {
		type: String,
		required: true
	},
	calendarID: {
		type: Number,
		required: true
	},
	notes: {
		type: String
	},
	parentID: {
		type: String
	}
});

module.exports = mongoose.model('Block', BlockSchema);
