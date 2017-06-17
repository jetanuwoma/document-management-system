import { Logger } from 'logger';
import bcrypt from 'bcrypt-nodejs';
import { sequelize, Roles, Users } from '../../models';
/**
 * Seeder - Class to populate database with values for testing purpose
 */
class Seeder {

  /**
   * Seeding database with test values
   * @return {void}
   */
  static seed() {
    sequelize.sync({ force: true })
    .then(() => {
      Seeder.seedRoles()
      .then(() => {
        Seeder.seedUsers();
      });
    })
    .catch((err) => {
      Logger.error(err);
    });
  }

  /**
   * seedRoles - Seed the roles table with some data for testing purpose
   * @return {Object} An instance of sequelize
   */
  static seedRoles() {
    const roles = [
      {
        title: 'SuperAdmin',
        read: true,
        write: true,
        delete: true,
      },
      {
        title: 'P&C',
        read: false,
        write: false,
        delete: false,
      },
      {
        title: 'Success',
        read: false,
        write: false,
        delete: false,
      }
    ];
    return Roles.bulkCreate(roles);
  }

  /**
   * Seed database with some default users
   * @returns {object} - A Promise object
   */
  static seedUsers() {
    const users = [
      {
        username: 'wapjude',
        email: 'wapjude@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(5)),
        fullNames: 'Etanuwoma Jude',
        RoleId: 1
      },
      {
        username: 'smalling',
        email: 'small@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(5)),
        fullNames: 'Small Jude',
        RoleId: 2
      }
    ];
    return Users.bulkCreate(users);
  }

}

export default Seeder.seed();
