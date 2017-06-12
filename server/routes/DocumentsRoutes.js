import DocumentsController from '../controllers/DocumentsController';
import Access from '../middleware/Access';

const DocumentsRoutes = (router) => {
  router.use(Access.init, Access.verifyToken);

  router.route('/documents')
    .get(Access.isAdmin, DocumentsController.getAllDocuments)
    .post(DocumentsController.createDocument);

  router.route('/search/document')
    .get(DocumentsController.searchDocuments);

  router.route('/documents/:id')
    .get(Access.documentExists,
         Access.iCanAccessDocument,
         DocumentsController.getDocumentById
       )
    .put(Access.documentExists,
         Access.iCanAccessDocument,
         DocumentsController.updateDocument
       )
    .delete(Access.documentExists,
            Access.iCanAccessDocument,
            DocumentsController.deleteDocument
          );


    router.route('/documents/access/:access')
      .get(Access.accessType, DocumentsController.getAllUserPublicDocuments);

  router.route('/users/:id/documents')
    .get(Access.userExists,
       Access.documentsAreMine,
       DocumentsController.getUserDocuments);
};

export default DocumentsRoutes;
