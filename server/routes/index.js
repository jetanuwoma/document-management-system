import UsersRoutes from './UsersRoutes';
import RolesRoutes from './RolesRoutes';
import DocumentsRoutes from './DocumentsRoutes';
// setup routes using router
const Routes = (router) => {
  UsersRoutes(router);
  RolesRoutes(router);
  DocumentsRoutes(router);
};

export default Routes;
