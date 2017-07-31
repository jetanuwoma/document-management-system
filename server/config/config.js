const dotenv = require('dotenv');

dotenv.config();

// Set database connection settings
const config = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};

module.exports = config;
