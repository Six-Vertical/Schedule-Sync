const Acuity = require('acuityscheduling');
const userId = process.env.ACUITY_USER_ID_DEV_2;
const apiKey = process.env.ACUITY_API_KEY_DEV_2;

const acuity = Acuity.basic({
	userId,
	apiKey
});

module.exports = acuity;
