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
          req.document = document;
          next();
        } else {
          res.status(404)
            .send({ message: 'That documents does not exists!' });
        }
      });
  }

  /**
   * verifyAccess - check if i can access the document
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static verifyAccess(req, res, next) {
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
   * isUserOrAdmin - check if i can view the respective user documents
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static isUserOrAdmin(req, res, next) {
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
          req.user = user;
          next();
        } else {
          res.status(404)
            .send({ message: 'That user does not exists' });
        }
      });
  }

  /**
   * verifyAccessParam - check requested access type
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static verifyAccessParam(req, res, next) {
    const access = ['public', 'role'].find(val => val === req.params.access);
    if (access) {
      req.verifyAccessParam = access;
      return next();
    }
    return res.status(404).send({
      message: 'Sorry you are requesting for a wrong documents type'
    });
  }

  /**
   * setSearchCriteria - define search zone for users
   * @param {object} req - Request Object
   * @param {object} res - Response Object
   * @param {callback} next callback to the next middleware or function
   */
  static setSearchCriteria(req, res, next) {
    const access = req.query.access;
    const term = req.query.q || '';
    let query = { where: { title: { $iLike: `%${term}%` } } };
    if (req.decoded.RoleId === 1 && req.query.personal === undefined) {
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
}

export default Access;
