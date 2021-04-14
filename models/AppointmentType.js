const mongoose = require('mongoose');

const AppointmentTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	typeId: {
		type: String,
		required: [true, 'TypeID is required'],
		unique: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('AppointmentType', AppointmentTypeSchema);
