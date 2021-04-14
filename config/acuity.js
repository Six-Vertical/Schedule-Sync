const Acuity = require('acuityscheduling');
const userId = process.env.ACUITY_USER_ID_DEV_1;
const apiKey = process.env.ACUITY_API_KEY_DEV_1;

const acuity = Acuity.basic({
	userId,
	apiKey
});

module.exports = acuity;
