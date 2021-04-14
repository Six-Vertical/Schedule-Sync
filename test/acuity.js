const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe(`Acuity routes - /api/v1/acuity`, () => {
	describe('GET - /appointments', () => {
		it('Should get all appointments scheduled', (done) => {
			chai
				.request(server)
				.get('/api/v1/acuity/appointments')
				.end((err, rez) => {
					rez.should.have.status(200);
					rez.body.should.be.a('object');
					rez.body.appointments.should.be.a('array');
				});
			done();
		});
	});

	describe('GET - /appointments/:aptId', () => {
		it(`Should fetch appointment by appointment ID`, (done) => {
			chai
				.request(server)
				.get('/api/v1/acuity/appointments/538027150')
				.end((err, rez) => {
					rez.should.be.a('object');
					expect(rez.body.appointment).to.have.property('id');
					expect(rez.body.appointment).to.have.property('firstName');
					expect(rez.body.appointment).to.have.property('lastName');
					expect(rez.body.appointment.id).to.eq(538027150);
				});
			done();
		});
	});

	// describe('POST - /apointments', () => {
	// 	const appt = {
	// 		appointmentTypeID: 20881507,
	// 		datetime: '2021-03-16T13:30',
	// 		firstName: 'John',
	// 		lastName: 'James',
	// 		email: 'jjame@gg.okay'
	// 	};

	// 	it('Should create an appointment', (done) => {
	// 		chai
	// 			.request(server)
	// 			.post('/api/v1/acuity/appointments')
	// 			.send(appt)
	// 			.end((err, rez) => {
	// 				expect(rez).to.have.status(201);
	// 				expect(rez.body.success).to.be.true;
	// 				expect(rez.body.appointment).haveOwnProperty('firstName').eq(appt.firstName);
	// 			});
	// 		done();
	// 	});
	// });

	// describe('PUT - /appointments/:aptId', () => {
	// 	const appt = {
	// 		appointmentTypeID: 20881507,
	// 		datetime: '2021-03-16T09:30',
	// 		firstName: 'Long',
	// 		lastName: 'James',
	// 		email: 'ljames@gg.nope'
	// 	};

	// 	it('Should update appointment by appointment ID', (done) => {
	// 		chai
	// 			.request(server)
	// 			.put('/api/v1/appointments/542079909')
	// 			.send()
	// 			.end((err, rez) => {
	// 				expect(rez).to.exist();
	// 			});
	// 		done();
	// 	});
	// });
});
