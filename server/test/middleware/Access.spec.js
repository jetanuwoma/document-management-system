/* eslint-disable no-unused-expressions */
import 'babel-polyfill';
import httpMocks from 'node-mocks-http';
import supertest from 'supertest';
import chai from 'chai';
import sinon from 'sinon';
import events from 'events';
import app from '../../config/app';
import Access from '../../middleware/Access';
import db, { Documents, Users, Roles } from '../../models';


const expect = chai.expect;
const request = supertest(app);
const next = () => Promise.resolve(true);
const createResponse = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });
let adminDetails;
let regularDetails;
let testDetails;

describe('Access middleware', () => {
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
            request.post('/api/users/login')
              .send({
                username: 'kingsley',
                password: 'password'
              })
              .end((err, res) => {
                testDetails = res.body;
                done();
              });
          });
      });
  });

  describe('verifyToken', () => {
    it('returns an error if token is not passed', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
      });
      res.on('end', () => {
        expect(res._getData().message).to.equal('Unauthorized Access');
        done();
      });
      Access.verifyToken(req, res);
    });

    it('returns error when validating an invalid token', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { 'x-access-token': 'somerubbishthatisnotgood' }
      });
      res.on('end', () => {
        expect(res._getData().message).to.equal('Could not verify that token please obtain new one');
        expect(res.statusCode).to.equal(401);
        done();
      });
      Access.verifyToken(req, res);
    });

    it('Should call the next function if token is valid', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { 'x-access-token': adminDetails.token }
      });
      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.verifyToken(req, res, next.callNext);
      res.on('end', () => {
        expect(next.callNext).to.have.been.called;
        done();
      });
    });
  });

  describe('Accessing documents', () => {
    it('Should allow document owner to access document', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents/1',
        decoded: { RoleId: 1, UserId: 1 },
        document: { OwnerId: 1 }
      });
      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.documentAccess(req, res, next.callNext);
      res.on('end', () => {
        expect(next.callNext).to.have.been.called;
        done();
      });
    });

    it('Should allow document admin to access document', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents/1',
        decoded: { RoleId: 1, UserId: 1 },
        document: { OwnerId: 2 }
      });
      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.documentAccess(req, res, next.callNext);
      res.on('end', () => {
        expect(next.callNext).to.have.been.called;
        done();
      });
    });

    it('Should set access zone when user access public document', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents',
        decoded: { RoleId: 1, UserId: 1 },
        params: { access: 'public' }
      });
      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.accessType(req, res, next.callNext);
      res.on('end', () => {
        expect(req.accessType).to.equal('public');
        expect(next.callNext).to.have.been.called;
        done();
      });
    });

    it('Should set access zone when user access role document', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents',
        decoded: { RoleId: 1, UserId: 1 },
        params: { access: 'role' }
      });
      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.accessType(req, res, next.callNext);
      res.on('end', () => {
        expect(req.accessType).to.equal('role');
        expect(next.callNext).to.have.been.called;
        done();
      });
    });

    it('Should show an error when user search for invalid scope', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents',
        decoded: { RoleId: 1, UserId: 1 },
        params: { access: 'mule' }
      });

      res.on('end', () => {
        expect(res.statusCode).to.equal(404);
        expect(res._getData().message).to.equal('Sorry you are requesting for a wrong documents type');
        done();
      });
      Access.accessType(req, res);
    });
  });


  describe('When searching for document', () => {
    it('Should set global searching for admin when permission is not defined', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents/search',
        decoded: { RoleId: 1, UserId: 1 },
        query: { q: 'jude' },
      });

      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.setSearchCriteria(req, res, next.callNext);
      res.on('end', () => {
        expect(next.callNext).to.have.been.called;
        expect(req.query).to.exist;
        done();
      });
    });

    it('Should set global searching for admin when permission is defined', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents/search',
        decoded: { RoleId: 1, UserId: 1 },
        query: { q: 'jude', access: 'private' },
      });

      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.setSearchCriteria(req, res, next.callNext);
      res.on('end', () => {
        expect(next.callNext).to.have.been.called;
        expect(req.query).to.exist;
        done();
      });
    });

    it('Should set limited searching area for users when permission is not defined', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents/search',
        decoded: { RoleId: 2, UserId: 2 },
        query: { q: 'peter' },
      });

      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.setSearchCriteria(req, res, next.callNext);
      res.on('end', () => {
        expect(next.callNext).to.have.been.called;
        expect(req.query).to.exist;
        expect(req.query.where.$and[1].OwnerId).to.equal(2);
        done();
      });
    });

    it('Should set limited searching area for users when permission is public', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents/search',
        decoded: { RoleId: 2, UserId: 2 },
        query: { q: 'peter', access: 'public' },
      });

      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.setSearchCriteria(req, res, next.callNext);
      res.on('end', () => {
        expect(next.callNext).to.have.been.called;
        expect(req.query).to.exist;
        expect(req.query.where.$and[1].OwnerId).to.equal(2);
        expect(req.query.where.$and[2].permission).to.equal('public');
        done();
      });
    });

    it('Should set limited searching area for users when permission is private', () => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents/search',
        decoded: { RoleId: 2, UserId: 2 },
        query: { q: 'peter', access: 'private' },
      });

      const next = {
        callNext: () => { }
      };
      sinon.spy(next, 'callNext');
      Access.setSearchCriteria(req, res, next.callNext);
      res.on('end', () => {
        expect(next.callNext).to.have.been.called;
        expect(req.query).to.exist;
        expect(req.query.where.$and[1].OwnerId).to.equal(2);
        expect(req.query.where.$and[2].permission).to.equal('public');
        done();
      });
    });
  });
});
