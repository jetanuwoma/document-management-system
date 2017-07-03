import RolesController from '../controllers/RolesController';
import Access from '../middleware/Access';

// Roles routes, Please take a look at the Roles controller for details
const RoleRoutes = (router) => {
  router.use(Access.init, Access.verifyToken);
  /**
   * @swagger
   * definition:
   *   Roles:
   *     type: object
   *     required:
   *        - title
   *        - read
   *        - write
   *        - delete
   *     properties:
   *        title:
   *            type: string
   *        read:
   *            type: boolean
   *        write:
   *            type: boolean
   *        delete:
   *            type: boolean
   */
  router.route('/roles')
    /**
   * @swagger
   * /api/roles:
   *   get:
   *     tags:
   *       - Roles
   *     description: Returns all roles
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: x-access-token
   *         description: request x-access-token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: An array of roles
   *         schema:
   *           $ref: '#/definitions/Roles'
   */
    .get(Access.isAdmin, RolesController.getAllRoles)
    /**
   * @swagger
   * /api/roles:
   *   post:
   *     description: Creates a new Role
   *     tags:
   *      - Roles
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: x-access-token
   *         description: request x-access-token
   *         in: header
   *         required: true
   *         type: string
   *       - name: title
   *         description: Role title
   *         in: form
   *         required: true
   *         type: string
   *       - name: read
   *         description: Read access
   *         in: form
   *         required: true
   *         type: boolean
   *       - name: write
   *         description: Write access
   *         in: form
   *         required: true
   *         type: boolean
   *       - name: delete
   *         description: Delete access
   *         in: form
   *         required: true
   *         type: boolean
   *     responses:
   *       200:
   *         description: Creates a new Role
   *         schema:
   *           $ref: '#/definitions/Roles'
   **/
    .post(Access.isAdmin, RolesController.createRole);

  router.route('/roles/:id')
    .get(Access.isAdmin, RolesController.getRole)
    .put(Access.isAdmin, RolesController.updateRole)
    .delete(Access.isAdmin, RolesController.deleteRole);
};

export default RoleRoutes;
