import { Documents } from '../models';

/**
 * Documents Controller class that handles all Users documents
 */
class DocumentsController {

  /**
   * Gets all documents in the database
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static getAllDocuments(req, res) {
    Documents.findAll({
      limit: req.query.limit || 6,
      offset: req.query.offset * (req.query.limit || 6) || 0,
      order: '"createdAt" DESC',
    })
      .then((documents) => {
        res.status(200)
          .send(documents);
      })
      .catch(() => {
        res.status(400)
          .send({ message: 'Error retrieving documents' });
      });
  }

  /**
   * Get a specific document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static getDocumentById(req, res) {
    res.status(200).send(req.document);
  }

  /**
   * Creates a new document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} no return
   */
  static createDocument(req, res) {
    req.body.OwnerId = req.decoded.UserId;
    Documents.create(req.body)
      .then((document) => {
        res.status(201)
          .send(document);
      })
      .catch(() => {
        res.status(400)
          .send({ message: 'Error creating documents' });
      });
  }

  /**
   * Get all documents that belongs to a particular user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static getUserDocuments(req, res) {
    Documents.findAll({
      order: '"createdAt" DESC',
      limit: req.query.limit || 6,
      offset: req.query.offset * (req.query.limit || 6) || 0,
      where: { OwnerId: req.params.id }
    })
      .then((documents) => {
        res.status(200)
          .send(documents);
      })
      .catch(() => {
        res.status(400)
          .send({ message: 'Error fetching documents' });
      });
  }

  /**
   * Get all public or role documents of a users
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static getAllUserPublicDocuments(req, res) {
    Documents.findAll({
      order: '"createdAt" DESC',
      limit: req.query.limit || 6,
      offset: req.query.offset * (req.query.limit || 6) || 0,
      where: { permission: req.verifyAccessParam }
    })
      .then(documents => res.status(200).send(documents));
  }

  /**
   * Update documet's details
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static updateDocument(req, res) {
    req.document.update(req.body)
      .then((updated) => {
        res.status(200).send(updated);
      });
  }

  /**
   * searchDocuments - Search list of documents by their title
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} Returns void
   */
  static searchDocuments(req, res) {
    // defined in the access middleware
    const searchQuery = req.searchQuery.where;
    const query = {
      order: '"createdAt" DESC',
      where: searchQuery
    };
    if (req.query.offset !== undefined) {
       query['limit'] = req.query.limit || 6;
       query['offset'] = req.query.offset * (req.query.limit || 6) || 0;
    }
    Documents.findAndCountAll(query)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch(() => {
        res.status(404).send({
          message: 'Error fetching documents with that term'
        });
      });
  }

  /**
   * Delete a particular document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {void} Returns void
   */
  static deleteDocument(req, res) {
    req.document.destroy()
      .then(() => {
        res.status(200).send({
          message: `${req.document.title} has been deleted`
        });
      });
  }

  /**
   * Get total number of users documents based on access level
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {void} Returns void
   */
  static getDocumentCounts(req, res) {
    const searchQuery = req.searchQuery.where;
    Documents.findAndCountAll({
      where: searchQuery
    }).then((result) => {
      res.send({ count: result.count });
    }).catch((error) => {
      res.send({ message: error });
    });
  }

}

export default DocumentsController;
