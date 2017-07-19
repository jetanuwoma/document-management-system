import chai from 'chai';
import faker from 'faker';
import supertest from 'supertest';
import app from '../../config/app';

const request = supertest.agent(app);
const expect = chai.expect;
const testUser = {
  username: faker.internet.userName(),
  fullNames: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
};
const testFakeAdmin = {
  username: faker.internet.userName(),
  fullNames: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
  RoleId: 1,
};

let adminDetails;
let regularDetails;
let testDetails;

describe('Users', () => {
  describe('Authenticate', () => {
    const existingUser = {
      username: 'wapjude',
      password: 'password'
    };

    it('Should create a new user for passed valid credentials', (done) => {
      request.post('/api/users')
      .type('form')
      .send(testUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.user.fullNames).to.equal(testUser.fullNames);
        expect(res.body.user.username).to.equal(testUser.username);
        expect(res.body.user.email).to.equal(testUser.email);
        expect(res.body.user.RoleId).to.equal(2);
        done();
      });
    });

    it('Should reject duplicating same user', (done) => {
      request.post('/api/users')
      .send(testUser)
      .expect(409)
      .end((err, res) => {
        expect(res.body.message
           .includes('This email is in existence please choose a new one or login')) //eslint-disable-line
           .to.equal(true);
        done();
      });
    });

    it('Should disallow user registering as an admin', (done) => {
      request.post('/api/users')
      .send(testFakeAdmin)
      .end((err, res) => {
        expect(res.body.message
        .includes('You can\'t create an admin account yourself'));
        done();
      });
    });

    it('Should give a default role to new user',
     (done) => {
       testUser.username = faker.internet.userName();
       testUser.email = faker.internet.email();
       request.post('/api/users')
      .send(testUser)
      .expect(201)
      .end((err, res) => {
        expect(res.body.user.RoleId).to.equal(2);
        done();
      });
     });

    it('Should login a user with the right credentials', (done) => {
      request.post('/api/users/login')
      .send(existingUser)
      .expect(200)
      .end((err, res) => {
        expect(res.body.user.username).to.equal(existingUser.username);
        done();
      });
    });

    it('Should generate a valid token on successful login', (done) => {
      request.post('/api/users/login')
      .send(existingUser)
      .expect(200)
      .end((err, res) => {
        expect(typeof res.body.token).equal('string');
        
        done();
      });
    });

    it('Should deny access for invalid login details ', (done) => {
      request.post('/api/users/login')
    .send({
      username: faker.internet.userName(),
      password: faker.internet.password()
    })
    .expect(401)
    .end((err, res) => {
      expect(res.body.message).to.equal('Invalid credentials supplied!');
      done();
    });
    });

    it('Should logout a user', (done) => {
      request.post('/api/users/login')
    .type('form')
    .send({
      username: 'wapjude',
      password: 'password'
    })
    .end((err, res) => {
      const user = res.body;
      request.post('/api/users/logout')
      .set({ 'x-access-token': user.token })
      .expect(200)
      .end((err, res) => {
        expect(res.body.message)
          .to.equal('User logged out');
        done();
      });
    });
    });
  });

  describe('Get Users', () => {
    before((done) => {
      request.post('/api/users/login')
        .send({ username: 'wapjude', password: 'password' })
        .end((err, res) => {
          adminDetails = res.body;
          request.post('/api/users/login')
            .send({
              username: 'smalling',
              password: 'password'
            })
            .end((err, res) => {
              regularDetails = res.body;
              request.post('/api/users')
                .send(testUser)
                .end((err, res) => {
                  testDetails = res.body;
                  done();
                });
            });
        });
    });

    it('Should allow admin users to access all users list', (done) => {
      request.get('/api/users')
    .set({ 'x-access-token': adminDetails.token })
      .end((err, res) => {
        expect(res.body.length).to.equal(7);
        done();
      });
    });

    it('Should reject Unauthorized access to all users for user not logged in',
     (done) => {
       request.get('/api/users')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
            .to.equal('Unauthorized Access');
            done();
          });
     });

    it('Should not allow regular users to view all registered users', (done) => {
      request.get('/api/users')
        .set({ 'x-access-token': regularDetails.token })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
            .to.equal('Requires an admin access to proceed');
            done();
          });
    });

    it('Should not allow un-authenticated users access user by email',
     (done) => {
       request.get(`/api/users/${regularDetails.user.email}`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
            .to.equal('Unauthorized Access');
            done();
          });
     });
  });

  describe('Update User', () => {
    before((done) => {
      request.post('/api/users/login')
        .type('form')
        .send({ username: 'wapjude',
          password: 'password' })
        .end((err, res) => {
          adminDetails = res.body;
          request.post('/api/users/login')
            .send({
              username: 'smalling',
              password: 'password'
            })
            .end((err, res) => {
              regularDetails = res.body;
              done();
            });
        });
    });

    it('Should fail for un-authenticated users ',
     (done) => {
       request.put(`/api/users/${regularDetails.user.id}`)
       .send({
         fullNames: `${faker.name.firstName()} ${faker.name.lastName()}`
       })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
            .to.equal('Unauthorized Access');
            done();
          });
     });

    it('Should allow admin users update a user', (done) => {
      request.put(`/api/users/${regularDetails.user.id}`)
    .set({ 'x-access-token': adminDetails.token })
    .send({
      fullNames: `Teddy bear`
    })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.be.equal(`${regularDetails.user.id} updated`);
        expect(res.body.data.fullNames).to.equal('Teddy bear');
        done();
      });
    });

    it('Should allow a user update his details', (done) => {
      request.put(`/api/users/${regularDetails.user.id}`)
    .set({ 'x-access-token': regularDetails.token })
    .send({
      fullNames: `Creche baby`
    })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.be.equal(`${regularDetails.user.id} updated`);
        expect(res.body.data.fullNames).to.equal('Creche baby')
        done();
      });
    });
  });

  describe('Delete User', () => {
    before((done) => {
      request.post('/api/users/login')
        .type('form')
        .send({
          username: 'wapjude',
          password: 'password'
        })
        .end((err, res) => {
          adminDetails = res.body;
          request.post('/api/users/login')
            .send({
              username: 'smalling',
              password: 'password'
            })
            .end((err, res) => {
              regularDetails = res.body;
              testUser.email = faker.internet.email();
              testUser.username = faker.internet.userName();
              request.post('/api/users')
                .send(testUser)
                .end((err, res) => {
                  testDetails = res.body;
                  done();
                });
            });
        });
    });

    it('Should fail for un-authenticated users ',
     (done) => {
       request.delete(`/api/users/${regularDetails.user.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
            .to.equal('Unauthorized Access');
            done();
          });
     });

    it('Should allow admin users delete a user', (done) => {
      request.delete(`/api/users/${regularDetails.user.id}`)
    .set({ 'x-access-token': adminDetails.token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.be.equal(`${regularDetails.user.id} has been deleted`);
        done();
      });
    });


    it('Should deny NON admin users delete a user', (done) => {
      request.delete(`/api/users/${testDetails.user.id}`)
    .set({ 'x-access-token': regularDetails.token })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('Requires an admin access to proceed');
        done();
      });
    });

    it('Should deny a user from deleting himself', (done) => {
      request.delete(`/api/users/${regularDetails.user.id}`)
    .set({ 'x-access-token': regularDetails.token })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('Requires an admin access to proceed');
        done();
      });
    });

    it('Should deny deleting the admin', (done) => {
      request.delete(`/api/users/${adminDetails.user.id}`)
    .set({ 'x-access-token': adminDetails.token })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('You cant delete yourself');
        done();
      });
    });
  });
});
