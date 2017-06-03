import DocumentsController from '../controllers/DocumentsController';

const DocumentsRoutes = (router) => {
  router.route('/documents')
    .get(DocumentsController.getAllDocuments)
    .post(DocumentsController.createDocument);

  router.route('/documents/:id')
    .get(DocumentsController.getDocumentById)
    .put(DocumentsController.updateDocument)
    .delete(DocumentsController.deleteDocument);

  router.route('/users/:id/documents/all')
    .get(DocumentsController.getAllUserPublicDocuments);

  router.route('/users/:id/documents')
    .get(DocumentsController.getUserDocuments);

  router.route('/search/document')
    .get(DocumentsController.searchDocuments);
};

export default DocumentsRoutes;
