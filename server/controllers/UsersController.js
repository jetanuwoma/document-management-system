
const UsersController = {

  /**
   * index - Testing the index controller
   *
   * @param  {Object} req - Request Object
   * @param  {Object} res - Response Object
   * @return {void}
   */
  index(req, res) {
    res.status(200)
     .send({ message: 'Welcome to jude document management server system' });
  },

  /**
   * login - Login in the user with the credentials supplied
   *
   * @param  {Object} req - Request Object
   * @param  {Object} res - Response Object
   * @return {void}
   */
  login(req, res) {
    res.status(200)
     .send({ message: 'Logged in successfully' });
  },


  /**
   * signUp - Sign in Authentication for user
   *
   * @param  {Object} req - Request Object
   * @param  {Object} res - Response Object
   * @return {void}
   */
  signUp(req, res) {
    res.status(200).send({ message: 'signed up successfully' });
  }
};

export default UsersController;
