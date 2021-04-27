const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const connectDB = require('./config/db');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const getBlocks = require('./events/getBlocks');

const app = express();
connectDB();

// getBlocks();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/v1/acuity', require('./routes/acuity/acuity'));
app.use('/api/v1/acuity/appointments', require('./routes/acuity/appointments'));
app.use('/api/v1/acuity/blocks', require('./routes/acuity/blocks'));
app.use('/api/v1/acuity/clients', require('./routes/acuity/clients'));

app.use('/api/v1/ma/accounts', require('./routes/api/accounts'));
app.use('/api/v1/ma/endpoints', require('./routes/api/endpoints'));
app.use('/api/v1/ma/mapping', require('./routes/api/mapping'));
app.use('/api/v1/ma/calendars', require('./routes/api/calendars'));
app.use('/api/v1/ma/blocks', require('./routes/api/blocks'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'DEFAULT';

app.listen(port, () => {
	console.log(`Express server running on port ${port}, in ${mode} mode`.cyan.underline.bold);
});

module.exports = app;
