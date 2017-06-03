import jwt from 'jsonwebtoken';
import { Users, Roles, Documents, ExpiredTokens, } from '../models';


/**
 * This class create and check
 * authentication access based on different users role
 */
class Access {

  /**
   * init - Pass jwt secret to the routes
   * @param {object} req -  Request Object
   * @param {object} res - Response Object
   * @param {callback} next - callback to the next middleware or function
   * @returns {Object} next call to middleware
   */
  static init(req, res, next) {
    req.secret = process.env.SECRET || 'thisissupposetobeasecret';
    next();
  }

  /**
   * verifyToken - Verifies the token supplied by user
   * @param {object} req -  Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} token validity response | void
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    // If no token is supplied
    if (!token) {
      res.status(401)
         .send({ message: 'Unauthorized Access' });
    } else {
    // Check if token has expired
      ExpiredTokens.find({ where: { token } })
      .then((expires) => {
        if (expires) {
          return res.status(401)
        .send({
          message: 'Your token has expired please login to obtain a new one'
        });
        }
      });
      // Decode token and allow access if valid
      jwt.verify(token, req.secret, (err, decoded) => {
        if (err) {
          return res.status(401)
                    .send({ message: err });
        }
        req.decoded = decoded;
        next();
      });
    }
  }

  /**
   * isAdmin - Verifies if user is an Admin
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} returns void if user is not admin
   */
  static isAdmin(req, res, next) {
    if (req.decoded.RoleId === 1) {
      next();
    } else {
      res.status(401)
        .send({ message: 'Requires an admin access to proceed' });
    }
  }

  /**
   * documentExists - checks if a document is existing
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} obect containing message or void
   */
  static documentExists(req, res, next) {
    Documents.findById(req.params.id)
      .then((document) => {
        if (document) {
          next();
        } else {
          res.status(404)
            .send({ message: 'That documents does not exists!' });
        }
      });
  }

  /**
   * iCanAccessDocument - check if i can access the document
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} obect containing message or void
   */
  static iCanAccessDocument(req, res, next) {
    Documents.findById(req.params.id)
      .then((document) => {
        if (req.decoded.UserId === document.OwnerId) {
            // is mine
          next();
        } else if (req.decoded.RoleId === 1) {
          // i am the admin/superAdmin
          next();
        } else if (document.permission === 'public') {
          // is open to everybody to edit
          next();
        } else {
          // you are forbidden
          res.status(404)
            .send({ message: 'You are forbidden to access this document' });
        }
      });
  }

  /**
   * documentsAreMine - check if i can view the respective user documents
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} obect containing message or void
   */
  static documentsAreMine(req, res, next) {
    if (req.params.id === req.decoded.UserId || req.decoded.RoleId === 1) {
      next();
    } else {
      res.status(404)
        .send({ message: 'Unauthorized access to documents' });
    }
  }

  /**
   * user - check if the user is existing
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} obect containing message or void
   */
  static userExists(req, res, next) {
    Users.findById(req.params.id)
      .then((user) => {
        if (user) {
          next();
        } else {
          res.status(404)
            .send({ message: 'That user does not exists' });
        }
      });
  }

}

export default Access;
