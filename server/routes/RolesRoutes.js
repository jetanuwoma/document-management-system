import RolesController from '../controllers/RolesController';

// Roles routes, Please take a look at the Roles controller for details
const RoleRoutes = (router) => {
  router.route('/roles')
    .get(RolesController.getAllRoles)
    .post(RolesController.createRole);

  router.route('/roles/:id')
    .get(RolesController.getRole)
    .put(RolesController.updateRole)
    .delete(RolesController.deleteRole);
};

export default RoleRoutes;
