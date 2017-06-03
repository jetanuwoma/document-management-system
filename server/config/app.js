/* eslint-disable global-require */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import Routes from '../routes/index';

const app = express();
const router = express.Router();

// Log all requests
app.use(morgan('dev'));

// make request body JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const env = process.env.NODE_ENV || 'development';

// using express router for routes
Routes(router);

// route every call to the api through the router
app.use('/api', router);

// Reserve for client pages display
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Document Management System');
});

// Notify users of undefined route
app.get('*', (req, res) => {
  res.status(404).send({
    message: `Hello its like you are lost,
              please kindly find your way back`
  });
});

export default app;
