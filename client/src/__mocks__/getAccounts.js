const fakeData = [
	{
		_id: 'f15dsa64f51dasfda',
		name: 'Franklin',
		createdAt: '2021-04-04T18:44:41.718Z'
	}
];

const getEndpointsMock = async (term) => {
	return await new Promise((resolve) => {
		resolve(fakeData);
	});
};

export default getEndpointsMock;
