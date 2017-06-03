import UsersController from '../controllers/UsersController';

// User routes, Please take a look at the User controller for details
const UsersRoutes = (router) => {
  router.route('/users')
    .get(UsersController.index);

  router.route('/users/login')
    .get(UsersController.login);
};

export default UsersRoutes;
