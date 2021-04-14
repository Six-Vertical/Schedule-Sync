const mongoose = require('mongoose');

const EndpointSchema = new mongoose.Schema({
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: true
	},
	username: {
		type: String,
		required: [true, 'Username for endpoint is required']
	},
	userId: {
		type: String,
		required: [true, 'API user ID is required']
	},
	apiKey: {
		type: String,
		required: [true, 'API Key is required']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

EndpointSchema.pre('remove', async function (next) {
	await this.model('Mapping').deleteMany({endpoint1: this._id});
	await this.model('Mapping').deleteMany({endpoint2: this._id});
	await this.model('Calendar').deleteMany({endpoint1: this._id});
	await this.model('Calendar').deleteMany({endpoint2: this._id});

	next();
});

module.exports = mongoose.model('Endpoint', EndpointSchema);
