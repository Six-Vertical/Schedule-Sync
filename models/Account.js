const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

AccountSchema.pre('remove', async function (next) {
	await this.model('Endpoint').deleteMany({account: this._id});
	await this.model('Mapping').deleteMany({account1: this._id});
	await this.model('Mapping').deleteMany({account2: this._id});
	await this.model('Calendar').deleteMany({account1: this._id});
	await this.model('Calendar').deleteMany({account2: this._id});
	next();
});

module.exports = mongoose.model('Account', AccountSchema);
