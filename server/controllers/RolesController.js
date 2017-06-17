import { Roles } from '../models';

/**
 * Roles Controller class that handles creating and modifying roles
 */
class RolesController {

  /**
   * getAllRoles - Get all Roles
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} - Returns void
   */
  static getAllRoles(req, res) {
    Roles.findAll()
    .then((role) => {
      res.status(201)
      .send(role);
    });
  }

  /**
   * getRole - Get a single Role by ID supplied
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} - Returns void
   */
  static getRole(req, res) {
    res.status(200)
      .send(req.body.role);
  }
  /**
   * updateRoles - Update an existing Roles
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} - Returns void
   */
  static updateRole(req, res) {
    req.body.role.update(req.body)
    .then(update => res
    .status(200)
    .send({ message: `${req.params.id} successfully updated`,
      data: update }))
      .catch(() => {
        res.status(500)
          .send({ message: 'An error occurred please try again' });
      });
  }

  /**
   * createRoles - Creates a new role
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} - Returns void
   */
  static createRole(req, res) {
    // If roles have been created, just alert the user
    Roles.findOne({ where: { title: req.body.title } })
    .then((role) => {
      if (role) {
        return res.status(409)
          .send({ message: `${req.body.title} Role is already created` });
      }

      // Create Role if is not existing before
      Roles.create(req.body)
      .then((newRole) => {
        res.status(201)
        .send(newRole);
      })
      .catch(() => {
        res.status(500)
        .send({ message: 'error occurred' });
      });
    });
  }

  /**
   * deleteRole - Delete a single role by id
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} Returns void
   */
  static deleteRole(req, res) {
    req
      .body
      .role
      .destroy()
    .then(() => {
      res.status(200)
      .send({ message: `${req.params.id} Role has been deleted!` });
    });
  }
}

export default RolesController;
