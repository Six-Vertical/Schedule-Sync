const mongoose = require('mongoose');
const db = process.env.MONGO_URI;
const colors = require('colors');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useFindAndModify: false,
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log('Mongo is running, buddy :D'.magenta.bold);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = connectDB;
