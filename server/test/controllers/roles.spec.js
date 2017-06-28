import chai from 'chai';
import supertest from 'supertest';
import faker from 'faker';
import app from '../../config/app';

const request = supertest.agent(app);
const expect = chai.expect;

let admin;
let regularUser;

describe('Role', () => {
  before((done) => {
    request.post('/api/users/login')
      .type('form')
      .send({ username: 'wapjude',
        password: 'password'
      })
        .end((err, res) => {
          admin = res.body;
          request.post('/api/users')
            .send({
              username: faker.internet.userName(),
              fullNames: `${faker.name.firstName()} ${faker.name.lastName()}`,
              email: `${faker.internet.email()}`,
              password: faker.internet.password(),
              RoleId: 2 })
            .end((err, res) => {
              regularUser = res.body;
              done();
            });
        });
  });

  describe('Create role', () => {
    const roleData = {
      title: faker.lorem.word(),
      write: false,
      read: false,
      delete: false,
    };

    it('Allows Admin to create a new role', (done) => {
      request.post('/api/roles')
        .set({ 'x-access-token': admin.token })
        .send(roleData)
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.title).to.equal(roleData.title);
          done();
        });
    });

    it('Should have a unique role title', (done) => {
      request.post('/api/roles')
        .set({ 'x-access-token': admin.token })
        .send(roleData)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
          .to.equal(`${roleData.title} Role is already created`);
          done();
        });
    });

    it('Should disallow creating role for a non admin user', (done) => {
      request.post('/api/roles')
        .set({ 'x-access-token': regularUser.token })
        .send({ title: faker.lorem.word() })
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).to
            .equal('Requires an admin access to proceed');
          done();
        });
    });
  });

  describe('Update role', () => {
    it('Should edit and update a role', (done) => {
      request.put('/api/roles/2')
        .set({ 'x-access-token': admin.token })
        .send({ title: 'updated role' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.title).to.equal('updated role');
          expect(res.body.message).to.equal('2 successfully updated');
          done();
        });
    });

    it('Should fail to update a role by a non admin', (done) => {
      request.put('/api/roles/2')
        .set({ 'x-access-token': regularUser.token })
        .send({ title: 'updated role' })
        .expect(403)
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('Requires an admin access to proceed');
          done();
        });
    });

    it('Should fail if a role does not exist', (done) => {
      request.put('/api/roles/10')
        .set({ 'x-access-token': admin.token })
        .send({ title: 'updated role' })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('Role does not exists');
          done();
        });
    });
    it('Should fail if role title already exist', (done) => {
      request.put('/api/roles/2')
        .set({ 'x-access-token': admin.token })
        .send({ title: 'Admin' })
        .expect(500)
        .end((err, res) => {
          expect(res.body.message.includes('Error Updating Role'));
          done();
        });
    });
  });
});
