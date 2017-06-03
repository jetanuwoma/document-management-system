/* eslint-disable no-unused-expressions */
import chai from 'chai';
import { Users, Roles } from '../../models';

const expect = chai.expect;
const userDetails = {
  username: 'judetest',
  fullNames: 'Jude Test',
  email: 'wapjudetest@mail.com',
  password: 'password',
  RoleId: 2 };

describe('Users model', () => {
  describe('Create user', () => {
    let user = {};

    before((done) => {
      Users.create(userDetails)
        .then((registeredUser) => {
          user = registeredUser;
          done();
        });
    });

    it('should be able to create a user', () => {
      expect(user).to.exist;
      expect(typeof user).to.equal('object');
    });

    it('should create a user with first name & last name', () => {
      expect(user.firstname).to.equal(userDetails.firstname);
      expect(user.lastname).to.equal(userDetails.lastname);
    });

    it('should create a user with a valid email', () => {
      expect(user.email).to.equal(userDetails.email);
    });

    it('should create a user with hashed password', () => {
      expect(user.password).to.not.equal(userDetails.password);
    });

    it('should create a user with a defined role', (done) => {
      Users.findById(user.id, {
        include: [Roles]
      })
      .then((foundUser) => {
        expect(foundUser.Role.title).to.equal('P&C');
        done();
      });
    });
    after(() => Users.destroy({ where: { id: user.id } }));
  });
});
