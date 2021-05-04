const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const db = process.env.MONGO_URI;

const Mapping = require('./models/Mapping');
const Calendar = require('./models/Calendar');

const deleteData = async () => {
	try {
		await Mapping.deleteMany();
		await Calendar.deleteMany();
		console.log(`Data Deleted`);
	} catch (err) {
		console.error(err);
	}
};

if (process.argv[2] === '-d') {
	deleteData();
}
