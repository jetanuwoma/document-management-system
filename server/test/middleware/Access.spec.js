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
  });
});
