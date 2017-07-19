import jwt from 'jsonwebtoken';
import { Users, Documents } from '../models';


/**
 * This class create and check
 * authentication access based on different user roles
 */
class Access {

  /**
   * init - Pass jwt secret to the routes
   * @param {object} req -  Request Object
   * @param {object} res - Response Object
   * @param {callback} next - callback to the next middleware or function
   */
  static init(req, res, next) {
    req.secret = process.env.SECRET;
    next();
  }

  /**
   * verifyToken - Verifies the token supplied by user
   * @param {object} req -  Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      res.status(401)
         .send({ message: 'Unauthorized Access' });
    } else {
      jwt.verify(token, req.secret, (err, decoded) => {
        if (err) {
          return res.status(401)
          .send({
            message: 'Could not verify that token please obtain new one'
          });
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
   * documentAccess - check if i can access the document
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static documentAccess(req, res, next) {
    Documents.findById(req.params.id)
      .then((document) => {
        if (req.decoded.UserId === document.OwnerId) {
          next();
        } else if (req.decoded.RoleId === 1) {
          next();
        } else if (document.permission === 'public') {
          next();
        } else {
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
   */
  static documentsAreMine(req, res, next) {
    if (parseInt(req.params.id, 10) === req.decoded.UserId ||
       req.decoded.RoleId === 1) {
      next();
    } else {
      res.status(404)
        .send({ message: 'Unauthorized access' });
    }
  }

  /**
   * user - check if the user is existing
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
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

  /**
   * accessType - check requested access type
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static accessType(req, res, next) {
    if (req.params.access === 'public') {
      req.accessType = 'public';
      next();
    } else if (req.params.access === 'role') {
      req.accessType = 'role';
      next();
    } else {
      res.status(404).send({
        message: 'Sorry you are requesting for a wrong documents type'
      });
    }
  }

  /**
   * setSearchCriterial - define search zone for users
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static setSearchCriteria(req, res, next) {
    const access = req.query.access;
    const term = req.query.q || '';
    let query = { where: { title: { $iLike: `%${term}%` } } };
    if (req.decoded.RoleId === 1) {
      if (access !== undefined && access !== null && access !== '') {
        query.where.permission = access;
      }
      req.searchQuery = query;
    } else {
      query = { where: { $and: [
        { title: { $iLike: `%${term}%` } },
        { OwnerId: req.decoded.UserId }
      ] } };

      if (access !== undefined && access !== null && access !== '') {
           query = { where: { $and: [
             { title: { $iLike: `%${term}%` } },
             { permission: access }
           ] } };
      }
      req.searchQuery = query;
    }


    next();
  }

  /**
   *canDeleteUser - Check if the admin can delete the given user
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static canDeleteUser(req, res, next) {
    Users.findById(req.params.id)
      .then((user) => {
        if (user.id === req.decoded.UserId &&
          req.decoded.RoleId === user.RoleId) {
          res.status(401)
            .send({ message: 'You cant delete yourself' });
        } else {
          next();
        }
      });
  }
}

export default Access;
