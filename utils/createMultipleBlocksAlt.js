const determineBlockMappingAlt = require('./determineBlockMappingAlt');
const requesting = require('request');
const filterBlock = require('./filterBlock');

const createMultipleBlocks = async (blocksData) => {
	await Promise.all(
		blocksData.map(async (block) => {
			try {
				const blockPassed = filterBlock(block);

				console.log({block: block.id, desc: block.description, blockPassed});
				const blockMappingKey = determineBlockMappingAlt(block.calendarID);

				data = {
					start: block.start,
					end: block.end,
					calendarID: blockMappingKey.altBookCalID,
					notes: `This sibling block is related to block ${block.id} and was created automatically with Schedule-Sync`
				};

				const options = {
					headers: {'Content-Type': 'application/json'},
					url: 'https://acuityscheduling.com/api/v1/blocks',
					auth: {
						user: process.env.ACUITY_USER_ID_DEV_2,
						password: process.env.ACUITY_API_KEY_DEV_2
					},
					body: JSON.stringify(data)
				};

				requesting.post(options, (e, rezult, body) => {
					if (e) {
						console.log(e);
						return;
					}

					console.log({BODY: body});

					return body;
				});
			} catch (err) {
				console.error(err);
			}
		})
	);
};

module.exports = createMultipleBlocks;
