const mongoose = require('mongoose');

const MappingSchema = new mongoose.Schema({
	account1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	endpoint1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Endpoint'
	},
	appointmentType1: {
		type: String,
		required: [true, 'Name for an appointment-type is required']
	},
	appointmentTypeName1: {
		type: String,
		required: [true, 'Name for an appointment-type is required']
	},
	account2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	endpoint2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Endpoint'
	},
	appointmentType2: {
		type: String,
		required: [true, 'Name for an appointment-type is required']
	},
	appointmentTypeName2: {
		type: String,
		required: [true, 'Name for an appointment-type is required']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Mapping', MappingSchema);
