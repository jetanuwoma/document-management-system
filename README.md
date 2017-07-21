[![Coverage Status](https://coveralls.io/repos/github/andela-jetanuwoma/document-management-system/badge.svg?branch=develop)](https://coveralls.io/github/andela-jetanuwoma/document-management-system?branch=develop)
![Code Climate](https://codeclimate.com/github/andela-jetanuwoma/document-management-system/badges/gpa.svg)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
# document-management-system
The system manages documents, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.

## API Documentation

## Users

EndPoint | Functionality
-------- | -------------
POST /users/login | Logs a user in.
POST /users/logout | Logs out a user.
POST /users/ | Creates a new user.
GET /users/ | Find matching instances of user.
GET /users/?limit={integer}&offset={integer} | Pagination
GET /users/<id> | Find user with the id.
PUT /users/<id> | Update user attributes with id.
DELETE /users/<id> | Deletes a user.
GET /search/users/?q={} | Search for a user.

## Documents

EndPoint | Functionality
-------- | -------------
POST /documents/ | Creates a new document.
GET /documents/ | Gets list of documents.
GET /documents/?limit={integer}&offset={integer} | Pagination
GET /documents/<id> | Finds a document with id.
PUT /documents/<id> | Updates document attributes with id.
DELETE /documents/<id> | Deletes a document with id.
GET /users/<id>/documents | Find all documents belonging to the user.
GET /search/documents/?q={doctitle} | Search for a doc.

## Roles

EndPoint | Functionality
-------- | -------------
GET /roles/ | List all roles.

View full API documentation [here !](https://wedoc-staging.herokuapp.com/api-docs/)

### Features
  - Admin user management.
  - Create and manage Documents. 
  - Decides who views your document
  - Edit document
  - Formatted documents

## Getting Started

#### Via Cloning The Repository:

```
# Clone the app
git clone https://github.com/andela-jetanuwoma/document-management-system.git

# Switch to directory
cd document-management-system

# Create .env file in the root directory
touch .env

# add your SECRET, PORT, DATABASE_URL, and TEST_DATABASE_URL keys

# Install Package dependencies
npm install

# Run your migrations
npm run db:migrate

# Run your migrations
npm run db:seed
```

## Testing
-   set you NODE_ENV to `test`
-   Run DB migrate command with `npm run db:migrate`.
-   Run Test `npm test` to run client and server side tests.
-   Run e2e test with `nightwatch` (ensure application is running)



### Contributing

If you are interested in contributing to development of document-management-system,

Follow the instructions below to contribute.

- Fork the repository

- Make your change

- Commit your change to your forked repository 

- Provide a detailed commit description 

- Create a pull request

For more about creating Pull request and branch naming convention
please checkout our wiki [Wiki !](https://github.com/andela-jetanuwoma/document-management-system/wiki)
