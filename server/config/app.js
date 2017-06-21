/* eslint-disable global-require */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import Routes from '../routes/index';

const routesPath = path.join(__dirname, '../routes/*.js');
const app = express();
const swaggerDefinition = {
  info: {
    title: 'Document Management System',
    version: '1.0.0',
    description: 'The system manages documents, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.', // eslint-disable-line
  },
  host: 'https://wedoc-staging.herokuapp.com/',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [routesPath],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const router = express.Router();

// Log all requests
app.use(morgan('dev'));

// make request body JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // eslint-disable-line
  next();
});

// using express router for routes
Routes(router);


// route every call to the api through the router
app.use('/api', router);

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

export default app;
