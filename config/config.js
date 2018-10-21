const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-auth'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/express-auth-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-auth'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/express-auth-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-auth'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/express-auth-production'
  }
};

module.exports = config[env];
