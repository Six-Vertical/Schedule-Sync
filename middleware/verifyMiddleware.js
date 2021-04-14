const Acuity = require('acuityscheduling');

const verifyMiddleware = Acuity.bodyParserVerify(process.env.ACUITY_API_KEY_PROD);

module.exports = verifyMiddleware;
