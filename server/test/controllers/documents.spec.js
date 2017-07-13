import chai from 'chai';
import supertest from 'supertest';
import faker from 'faker';
import app from '../../config/app';


const request = supertest(app);
const expect = chai.expect;
let adminDetails;
let regularDetails;
let testDetails;
const testUser = {
  username: faker.internet.userName(),
  fullNames: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
};
const testDocuments = {
  title: faker.lorem.words(),
  content: faker.lorem.paragraph(),
  permission: 'public',
  OwnerId: '1'
};

const testPrivateDocuments = {
  title: 'My Private Document',
  content: 'some content of this document',
  permission: 'Private',
  OwnerId: '2'
};

describe('Document', () => {
  before((done) => {
    request.post('/api/users/login')
      .type('form')
      .send({
        username: 'wapjude',
        password: 'password'
      })
      .end((err, res) => {
        adminDetails = res.body;
        request.post('/api/users/login')
          .send({
            username: 'smalling',
            password: 'password'
          })
          .end((err, res) => {
            regularDetails = res.body;
            request.post('/api/users')
              .send(testUser)
              .end((err, res) => {
                testDetails = res.body;
                done();
              });
          });
      });
  });

  describe('Create document', () => {
    it('Should create a document for passed valid input', (done) => {
      request.post('/api/documents')
        .set({ 'x-access-token': adminDetails.token })
        .send(testDocuments)
        .expect(201)
        .end((err, res) => {
          expect(res.body.title).to.equal(testDocuments.title);
          expect(res.body.content).to.equal(testDocuments.content);
          expect(res.body.OwnerId).to.equal(testDocuments.OwnerId);
          done();
        });
    });

    it('Should fail to create a document for passed invalid input', (done) => {
      request.post('/api/documents')
        .set({ 'x-access-token': adminDetails.token })
        .send({ title: null })
        .end((err, res) => {
          expect(500);
          expect(res.body.message).to.equal('Error creating documents');
          done();
        });
    });
  });

  describe('Get document', () => {
    let document;
    testDocuments.title = faker.lorem.words();
    testDocuments.permission = 'Private';
    testDocuments.OwnerId = 1;
    before((done) => {
      request.post('/api/documents')
        .set({ 'x-access-token': regularDetails.token })
        .send(testDocuments)
        .end((err, res) => {
          document = res.body;
          done();
        });
    });

    it('Should return a private document only to its owner', (done) => {
      request.get(`/api/documents/${document.id}`)
        .set({ 'x-access-token': testDetails.token })
        .expect(403).end((err, res) => {
          expect(res.body.message)
          .to.equal('Unauthorized Access to this Document');
          done();
        });
      done();
    });

    it('Should get all documents for a specific user', (done) => {
      request.get(`/api/users/${adminDetails.user.id}/documents`)
        .set({ 'x-access-token': adminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).to.equal(3);
          expect(res.body[0].OwnerId).to.equal(adminDetails.user.id);
          expect(res.body[2].OwnerId).to.equal(adminDetails.user.id);
          done();
        });
    });

    it('Should get all documents of a specific user',
    (done) => {
      request.get(`/api/users/${adminDetails.user.id}/documents`)
        .set({ 'x-access-token': adminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(res.body[0].OwnerId).to.equal(adminDetails.user.id);
          done();
        });
    });

    it('Should return all documents to the admin', (done) => {
      request.get('/api/documents')
        .set({ 'x-access-token': adminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).to.equal(6);
          done();
        });
    });

    it('Should not return all documents to a non admin', (done) => {
      request.get('/api/documents')
        .set({ 'x-access-token': regularDetails.token })
        .expect(200).end((err, res) => {
          expect(res.body.message).to.equal('Requires an admin access to proceed'); // eslint-disable-line
          done();
        });
    });

    it('Should return a private document to the admin', (done) => {
      request.get(`/api/documents/${document.id}`)
        .set({ 'x-access-token': adminDetails.token })
        .expect(200).end((err, res) => {
          expect(res.body.title).to.equal(document.title);
          expect(res.body.permission).to.equal('Private');
          done();
        });
      done();
    });

    it('Should fail if a document does not exist', (done) => {
      request.get('/api/documents/1000')
        .set({ 'x-access-token': adminDetails.token })
        .expect(404).end((err, res) => {
          expect(res.body.message)
            .to.equal('That documents does not exists!');
          done();
        });
    });
  });

  describe('Update document', () => {
    let document;
    before((done) => {
      testPrivateDocuments.title = faker.lorem.words();
      testPrivateDocuments.content = faker.lorem.paragraph();
      testPrivateDocuments.permission = 'Private';
      request.post('/api/documents')
        .set({ 'x-access-token': regularDetails.token })
        .send(testPrivateDocuments)
        .end((err, res) => {
          document = res.body;
          done();
        });
    });

    it('Should edit and update a document by the owner', (done) => {
      request.put(`/api/documents/${document.id}`)
        .set({ 'x-access-token': regularDetails.token })
        .send({ title: 'New title', content: 'some changed content' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.title).to.equal('New title');
          expect(res.body.content).to.equal('some changed content');
          done();
        });
    });

    it('Should fail if the document is not owned by you', (done) => {
      request.put(`/api/documents/${document.id}`)
        .set({ 'x-access-token': testDetails.token })
        .send({ title: 'doc title updated' })
        .expect(403)
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('You are forbidden to access this document');
          done();
        });
    });

    it('Should fail if the document does not exist', (done) => {
      request.put('/api/documents/90324')
        .set({ 'x-access-token': adminDetails.token })
        .send({ title: 'doc title updated' })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('That documents does not exists!');
          done();
        });
    });
  });

  describe('Delete a document', () => {
    let document;
    before((done) => {
      testPrivateDocuments.title = faker.lorem.words();
      testPrivateDocuments.content = faker.lorem.paragraph();
      testPrivateDocuments.permission = 'Private';
      request.post('/api/documents')
        .set({ 'x-access-token': regularDetails.token })
        .send(testPrivateDocuments)
        .end((err, res) => {
          document = res.body;
          done();
        });
    });

    it('Should fail if document is not owned by you', (done) => {
      request.delete(`/api/documents/${document.id}`)
        .set({ 'x-access-token': testDetails.token })
        .expect(403)
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('You are forbidden to access this document');
          done();
        });
    });

    it('Should fail if document does not exist', (done) => {
      request.delete('/api/documents/100000')
        .set({ 'x-access-token': regularDetails.token })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('That documents does not exists!');
          done();
        });
    });

    it('Should delete a document', (done) => {
      request.delete(`/api/documents/${document.id}`)
        .set({ 'x-access-token': regularDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message)
          .to.equal(`${document.title} has been deleted`);
          done();
        });
    });
  });
});
