import { Logger } from 'logger';
import bcrypt from 'bcrypt-nodejs';
import faker from 'faker';
import { sequelize, Roles, Users, Documents } from '../../models';
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
        Seeder.seedUsers()
         .then(() => {
           Seeder.seedDocuments();
         });
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
        fullName: 'Etanuwoma Jude',
        roleId: 1
      },
      {
        username: 'smalling',
        email: 'small@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(5)),
        fullName: 'Small Jude',
        roleId: 2
      },
      {
        username: 'kingsley',
        email: 'kigsley@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(5)),
        fullName: 'Kigsley Jude',
        roleId: 3
      }
    ];
    return Users.bulkCreate(users);
  }

  /**
   * Add some documents to database
   * @returns {object} - A Promise object
   */
  static seedDocuments() {
    const documents = [
      {
        title: 'Admin test case',
        content: faker.lorem.paragraph(),
        permission: 'private',
        ownerId: '1'
      },
      {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        permission: 'public',
        ownerId: '1'
      },
      {
        title: 'The second chance',
        content: faker.lorem.words(),
        permission: 'public',
        ownerId: '3'
      },
      {
        title: 'Harry potter gold',
        content: faker.lorem.words(),
        permission: 'private',
        ownerId: '3'
      },
      {
        title: 'The wake of humanism',
        content: faker.lorem.words(),
        permission: 'private',
        ownerId: '3'
      }
    ];
    return Documents.bulkCreate(documents);
  }


}

export default Seeder.seed();
