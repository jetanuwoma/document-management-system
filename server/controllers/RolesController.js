import { Roles } from '../models';

/**
 * Roles Controller class that handles creating and modifying roles
 */
class RolesController {

  /**
   * getAllRoles - Get all Roles
   * @param {Object} req - Request object
   * @param {Object} res - Response object
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
   */
  static getRole(req, res) {
    res.status(200)
      .send(req.body.role);
  }
  /**
   * updateRoles - Update an existing Roles
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   */
  static updateRole(req, res) {
    Roles.findById(req.params.id)
      .then((role) => {
        role.update(req.body)
          .then(update => res
            .status(200)
            .send({
              message: `${req.params.id} successfully updated`,
              data: update
            }))
          .catch(() => {
            res.status(400)
              .send({ message: 'An error occurred please try again' });
          });
      })
      .catch(() => {
        res.status(404).send({ message: 'Role does not exists' });
      });
  }

  /**
   * createRoles - Creates a new role
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   */
  static createRole(req, res) {
    Roles.findOne({ where: { title: req.body.title } })
      .then((role) => {
        if (role) {
          return res.status(409)
            .send({ message: `${req.body.title} Role is already created` });
        }

        Roles.create(req.body)
          .then((newRole) => {
            res.status(201)
              .send(newRole);
          })
          .catch(() => {
            res.status(400)
              .send({ message: 'error occurred' });
          });
      });
  }

  /**
   * deleteRole - Delete a single role by id
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   */
  static deleteRole(req, res) {
    Roles.findById(req.params.id)
      .then((role) => {
        role.destroy()
          .then(() => {
            res.status(200)
              .send({ message: `${req.params.id} Role has been deleted!` });
          });
      })
      .catch(() => {
        res.status(404).send({ message: 'Role does not exists' });
      });
  }
}

export default RolesController;
