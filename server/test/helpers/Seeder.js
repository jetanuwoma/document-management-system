import { Logger } from 'logger';
import { sequelize, Roles } from '../../models';
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
      Seeder.seedRoles();
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

}

export default Seeder.seed();
