const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
	blockId: {
		type: String,
		required: true
	},
	childBlockId: {
		type: String
	},
	parentBlockId: {
		type: String
	},
	startTime: {
		type: String,
		required: true
	},
	endTime: {
		type: String,
		required: true
	},
	timezone: {
		type: String
	},
	notes: {
		type: String
	},
	calendar: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Calendar',
		select: true
	},
	endpoint: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Endpoint',
		select: true
	},
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
		select: true
	}
});

module.exports = mongoose.model('Block', BlockSchema);
