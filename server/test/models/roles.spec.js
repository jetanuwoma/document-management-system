/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import { Roles } from '../../models';

const roleData = {
  title: 'testUser',
  write: false,
  read: false,
  delete: false,
};

describe('Roles', () => {
  describe('Creating roles', () => {
    let role;
    before((done) => {
      Roles.create(roleData)
        .then((roleCreated) => {
          role = roleCreated;
          done();
        })
        .catch((err) => {
          // some error that cannot be logged
        });
    });

    it('should create a role for testUser', () => {
      expect(role).to.exist;
    });

    it('should return the created title', () => {
      expect(role.title).to.equal('testUser');
    });

    it('should return false for write access', () => {
      expect(role.write).to.equal(false);
    });

    it('should return false for read access', () => {
      expect(role.read).to.equal(false);
    });


    after(() => Roles.destroy({ where: { id: role.id } }));
  });
});
