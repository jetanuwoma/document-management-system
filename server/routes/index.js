import UsersRoutes from './UsersRoutes';
import RolesRoutes from './RolesRoutes';
// setup routes using router
const Routes = (router) => {
  UsersRoutes(router);
  RolesRoutes(router);
};

export default Routes;
