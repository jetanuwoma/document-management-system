import RolesController from '../controllers/RolesController';
import Access from '../middleware/Access';

// Roles routes, Please take a look at the Roles controller for details
const RoleRoutes = (router) => {
  router.use(Access.init, Access.verifyToken);

  router.route('/roles')
    .get(Access.isAdmin, RolesController.getAllRoles)
    .post(Access.isAdmin, RolesController.createRole);

  router.route('/roles/:id')
    .get(Access.isAdmin, RolesController.getRole)
    .put(Access.isAdmin, RolesController.updateRole)
    .delete(Access.isAdmin, RolesController.deleteRole);
};

export default RoleRoutes;
