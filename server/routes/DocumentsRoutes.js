import DocumentsController from '../controllers/DocumentsController';
import Access from '../middleware/Access';

const DocumentsRoutes = (router) => {
  // Document Schema definition
  /**
   * @swagger
   * definition:
   *   Documents:
   *     properties:
   *       OwnerId:
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
     * /api/documents:
     *   get:
     *     tags:
     *       - Documents
     *     description: Returns all documents
     *     summary: Get All Documents
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-access-token
     *         description: request x-access-token
     *         in: header
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: An array of all documents
     *         schema:
     *           $ref: '#/definitions/Documents'
     *       500:
     *         description: Exception Error
     */
    .get(Access.isAdmin, DocumentsController.getAllDocuments)
    /**
 * @swagger
 * /api/documents:
 *   post:
 *     tags:
 *       - Documents
 *     description: Creates a document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: title
 *         description: document title
 *         in: form
 *         required: true
 *         type: string
 *       - name: content
 *         description: document content
 *         in: form
 *         required: true
 *         type: string
 *       - name: permission
 *         description: document access role
 *         in: form
 *         required: true
 *         type: string
 *       - name: OwnerId
 *         description: document creator ID
 *         in: form
 *         required: true
 *         type: number
 *     responses:
 *       201:
 *         description: Document Object created
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
    .post(DocumentsController.createDocument);
  /**
 * @swagger
 * /api/search/documents:
 *   get:
 *     tags:
 *       - Documents
 *     description: Returns an array of documents
 *     summary: Search for Document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: q
 *         description: The search term to search for
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of all documents
 *       500:
 *         description: Error fetching documents with that term
 */
  router.route('/search/document')
    .get(Access.setSearchCriterial, DocumentsController.searchDocuments);

  /**
 * @swagger
 * /api/count/document:
 *   get:
 *     tags:
 *       - Documents
 *     description: Returns the total number of documents, count all if access is not specified
 *     summary: Get documents count
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: access
 *         description: document access to count public, private, or role
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: total number of documents
 *       500:
 *         description: Error fetching documents with that term
 */

  router.route('/count/document')
    .get(Access.setSearchCriterial, DocumentsController.getDocumentCounts);

  router.route('/documents/:id')
    /**
     * @swagger
     * /api/documents/{id}:
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
     * /documents/access/{access}:
     *   get:
     *     tags:
     *       - Documents
     *     description: Returns all documents based on permission
     *     summary: Get all specified permission Documents
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User id 
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: An array of all specified permission documents
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
     *     summary: Retrieves a single user documents
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User id 
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: An array of all users documents
     *       404:
     *         description: No document found
     */
    .get(Access.userExists,
    Access.documentsAreMine,
    DocumentsController.getUserDocuments);
};

export default DocumentsRoutes;
