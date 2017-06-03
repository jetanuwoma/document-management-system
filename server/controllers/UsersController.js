import jwt from 'jsonwebtoken';
import { Users, ExpiredTokens, Roles } from '../models';


const userRecordDetail = newUser => ({
  id: newUser.id,
  username: newUser.username,
  fullNames: newUser.fullNames,
  email: newUser.email,
  RoleId: newUser.RoleId,
  createdAt: newUser.createdAt,
  updatedAt: newUser.updatedAt
});


/**
 * Users Controller class that handles all User's requests
 */
class UsersController {

  /**
   * login - Login in the user with the credentials supplied
   *
   * @param  {Object} req - Request Object
   * @param  {Object} res - Response Object
   * @return {void}
   */
  static login(req, res) {
    // find if record exists in the database
    Users.findOne({
      where: {
        $or: [
          { email: req.body.username },
          { username: req.body.username }]
      }
    }).then((user) => {
      // compare password to check if it matched
      if (user && user.validPassword(req.body.password)) {
        const token = jwt.sign({
          UserId: user.id,
          RoleId: user.RoleId
        }, req.secret, { expiresIn: '3 days' });
        res.status(200)
         .send({ user: userRecordDetail(user), token, expiresIn: '3 days' });
      } else {
        res.status(400)
          .send({ message: 'Invalid credentials supplied!' });
      }
    });
  }

  /**
   * logout - Logs out a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  static logout(req, res) {
    ExpiredTokens.create({ token: req.headers['x-access-token']
    || req.headers.authorization });
    ExpiredTokens.destroy({ where: {
      createdAt: { $lt: new Date() - (48 * 60 * 60 * 1000) } } });
    return res.status(200).send({ message:
      `User with id:${req.decoded.UserId} logged out` });
  }

  /**
  * signUp - Create a user
  * @param {Object} req - Request Object
  * @param {Object} res - Response Object
  * @returns {void} Returns void
  */
  static signUp(req, res) {
    Users.findOne({
      where: {
        email: req.body.email
      }
    })
       .then((userExist) => {
         // Notify user if account has been created before
         if (userExist) {
           return res.status(409)
             .send({
               message: `This email is in existence please
                         choose a new one or login`
             });
         }
         const { username, fullNames, email, password, RoleId } = req.body;
         // Reject non admin creating an admin account
         if (req.body.RoleId === '1' && req.decoded.RoleId !== 1) {
           return res.status(403)
             .send({
               message: 'You can\'t create an admin account yourself'
             });
         }

         const userToCreate = { username, fullNames, email, password, RoleId };
         // Create user's account and set session to expire in 3 days
         Users.create(userToCreate)
             .then((newUser) => {
               const token = jwt.sign({
                 UserId: newUser.id,
                 RoleId: newUser.RoleId
               }, req.secret, {
                 expiresIn: '3 days'
               });
               const user = userRecordDetail(newUser);
               res.status(201)
                 .send({
                   user,
                   token,
                   expiresIn: '3 days'
                 });
             })
             .catch((err) => {
               res.status(500)
               .send({
                 message: err
               });
             });
       });
  }

  /**
   * getUser - Get a single user based on email or username
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  static getUser(req, res) {
    // Find user with either their username or password
    Users.findOne({
      where: {
        $or: [{ email: req.params.id },
          { username: req.params.id }
        ]
      }
    }).then((user) => {
      // User not found
      if (!user) {
        return res.status(404)
        .send({ message: `User with ${req.params.id} does not exists` });
      }

      // Display result
      res.status(200).send(user);
    });
  }

  /**
   * updateUser - Update user details
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} Returns void
   */
  static updateUser(req, res) {
    Users.find({ where: {
      id: req.params.id } })
        .then((user) => {
          user.update(req.body)
            .then(updatedUser => res
              .status(200).send({ message: `${req.params.id} updated`,
                data: userRecordDetail(updatedUser)
              }));
        })
        .catch((err) => {
          res.status(404).send({
            message: `${req.params.id} does not meet any record`
          });
        });
  }

  /**
   * searchUsers - Search list of user where the search term
   * matches the fullnames
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  static searchUsers(req, res) {
    const query = req.query.searchQuery;
    Users.findAndCountAll({
      order: '"createdAt" DESC',
      where: { fullNames: { $iLike: `%${query}%` } }
    })
    .then((result) => {
      res.status(200)
       .send({ result: result.rows,
         metadata: {
           count: result.count,
           searchTerm: query
         }
       });
    })
    .catch((err) => {
      res.status(404)
        .send({ message: `${query} does not meet any record in the database` });
    });
  }

  /**
   * getAllUsers - Gets all user details in the databae
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} Returns void
   */
  static getAllUsers(req, res) {
    Users.findAll({ fields: [
      'id',
      'username',
      'fullName',
      'email',
      'RoleId',
      'createdAt',
      'updatedAt'
    ] })
      .then(Allusers => res.status(200).send(Allusers));
  }

  /**
   * deleteUser - Delete a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  static deleteUser(req, res) {
    Users.find({ where: {
      id: req.params.id } })
      .then((user) => {
        user.destroy()
      .then(() => {
        res.status(200).send({ message: `${req.params.id} has been deleted` });
      });
      });
  }

}

export default UsersController;
