import chai from 'chai';
import faker from 'faker';
import { Documents } from '../../models';

const expect = chai.expect;
const newDocument = {
  title: faker.lorem.word(),
  content: faker.lorem.paragraph(),
  permission: 'public',
  OwnerId: 1
};

describe('Document model', () => {
  describe('When creating Document', () => {
    let document = {};
    before((done) => {
      Documents.create(newDocument)
        .then((created) => {
          document = created;
          done();
        });
    });

    after(() => Documents.destroy({ where: { id: document.id } }));

    it('should be able to create a document', () => {
      expect(document).to.exist;
      expect(typeof document).to.equal('object');
    });

    it('should create a document with title', () => {
      expect(document.title).to.equal(newDocument.title);
    });

    it('should create a document with content', () => {
      expect(document.content).to.equal(newDocument.content);
    });

    it('should create a document with OwnerId', () => {
      expect(document.OwnerId).to.equal(1);
    });

    it('should create a document with date', () => {
      expect(document.createdAt).to.exist;
    });

    it('should create a document with access set to public', () => {
      expect(document.permission).to.equal('public');
    });
  });
});
