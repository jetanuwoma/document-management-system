import UsersController from '../controllers/UsersController';
import Access from '../middleware/Access';

const UsersRoutes = (router) => {
  router.use(Access.init);

  router.route('/users')
    .get(Access.verifyToken, Access.isAdmin, UsersController.getAllUsers)
    .post(UsersController.signUp);

  router.route('/users/login')
    .post(UsersController.login);

  router.route('/users/:id')
    .put(Access.verifyToken, UsersController.updateUser)
    .get(UsersController.getUser)
    .delete(Access.verifyToken, Access.isAdmin, UsersController.deleteUser);

  router.route('/users/logout')
    .post(UsersController.logout);

  router.route('/search/users')
    .get(Access.verifyToken, UsersController.searchUsers);
};

export default UsersRoutes;
