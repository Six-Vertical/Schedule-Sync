const fakeData = [
	{
		_id: 'fd15sa1f56das16f85d1afd45',
		account: {
			_id: 'fd5s4af1d5as61fdas5d6gf',
			name: 'Fake Account'
		},
		name: 'Faker Data',
		username: 'willkoste@gmail.com',
		userId: '154184561',
		apiKey: '1f5ds4f8h41j541y4145rt1t4',
		createdAt: '2021-05-02T11:45:06.838Z'
	},
	{
		_id: 'fd15sa1f56das16f85d1afd45',
		account: {
			_id: 'fd5s4af1d5as61fdas5d6gf',
			name: 'Fake Account'
		},
		name: 'Faker Data',
		username: 'willkoste@gmail.com',
		userId: '154184561',
		apiKey: '1f5ds4f8h41j541y4145rt1t4',
		createdAt: '2021-05-02T11:45:06.838Z'
	}
];

const getEndpointsMock = async (term) => {
	return await new Promise((resolve) => {
		resolve(fakeData);
	});
};

export default getEndpointsMock;
