import DocumentsController from '../controllers/DocumentsController';
import Access from '../middleware/Access';

const DocumentsRoutes = (router) => {
  // Document Schema definition
  /**
   * @swagger
   * definitions:
   *   Documents:
   *     properties:
   *       UserId:
   *         type: integer
   *       title:
   *         type: string
   *       content:
   *         type: string
   *       permission:
   *         type: integer
   *
   *   Pagination:
   *     properties:
   *       data:
   *         type: array
   *       pagination:
   *         $ref: '#/definitions/PaginationList'
   *
   *   PaginationList:
   *     properties:
   *       total:
   *         type: integer
   *       currentPage:
   *         type: integer
   *       totalPage:
   *         type: integer
   *       limit:
   *         type: integer
   *       offset:
   *         type: integer
   */
  router.use(Access.init, Access.verifyToken);

  router.route('/documents')
  // Get all Documents Routes
  /**
   * @swagger
   * /documents:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all documents
   *     summary: Get All Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   */
    .get(Access.isAdmin, DocumentsController.getAllDocuments)
    /**
     * @swagger
     * /documents:
     *   post:
     *     tags:
     *       - Documents
     *     description: Create a New Document
     *     summary: Create a New Document
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: document
     *         description: Document object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Documents'
     *     responses:
     *       200:
     *         description: Successfully created
     *       412:
     *         description: Document cannot be created
     */
    .post(DocumentsController.createDocument);

  router.route('/search/document')
    /**
   * @swagger
   * /documents/search:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns an array of documents
   *     summary: Search for Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: q
   *         description: The search term to search for
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: An array of all documents
   *       404:
   *         description: No document found
   */
    .get(Access.setSearchCriterial, DocumentsController.searchDocuments);

  router.route('/documents/:id')
  /**
   * @swagger
   * documents/{id}:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns a single document
   *     summary: Get Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Documents's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single document
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Document not found
   */
    .get(Access.documentExists,
         Access.iCanAccessDocument,
         DocumentsController.getDocumentById
       )
       /**
   * @swagger
   * documents/{id}:
   *   put:
   *     tags:
   *       - Documents
   *     description: Edit a single document
   *     summary: Edit Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully updated
   *       404:
   *         description: Document cannot be found
   */
    .put(Access.documentExists,
         Access.iCanAccessDocument,
         DocumentsController.updateDocument
       )
       /**
     * @swagger
     * /documents/{id}:
     *   delete:
     *     tags:
     *       - Documents
     *     description: Deletes a single document
     *     summary: Delete Document
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Document's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Successfully deleted
     *       404:
     *         description: Document cannot be found
     */
    .delete(Access.documentExists,
            Access.iCanAccessDocument,
            DocumentsController.deleteDocument
          );


  router.route('/documents/access/:access')
  // Get all documents based on the access levels Public, Private or Roles
  /**
   * @swagger
   * /documents/public:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all public documents
   *     summary: Get All Public Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all public documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   */
      .get(Access.accessType, DocumentsController.getAllUserPublicDocuments);
      // Get all Documents Pagination
      /**
       * @swagger
       * /documents/?limit={integer}&offset={integer}:
       *   get:
       *     tags:
       *       - Documents
       *     description: Returns all documents in a pagination format
       *     summary: Get all Documents Pagination
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: An array of all documents (data) with pagination
       *         schema:
       *           $ref: '#/definitions/Pagination'
       *       404:
       *         description: Documents not found
       *       412:
       *         description: Exception Error
       */
  router.route('/users/:id/documents')
  /**
   * @swagger
   * /users/:id/documents:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns an array of documents
   *     summary: Search for Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: q
   *         description: The search term to search for
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: An array of all documents
   *       404:
   *         description: No document found
   */
    .get(Access.userExists,
       Access.documentsAreMine,
       DocumentsController.getUserDocuments);
};

export default DocumentsRoutes;
