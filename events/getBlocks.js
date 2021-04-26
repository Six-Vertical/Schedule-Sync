const express = require('express');
const router = express.Router();
const requesting = require('request');

const getBlocks = () => {
	setInterval(() => {
		console.log('hey dude');
	}, 1000);
};

module.exports = getBlocks;
