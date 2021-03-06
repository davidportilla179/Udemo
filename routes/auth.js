const jwt = require('express-jwt');
const secret = require('../config').secret;

// Obtenemos el jwt del header de la petición y verificamos su existencia.
function getTokenFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

const auth = {
  require: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'student',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'student',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

const authTeacher = {
  require: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'teacher',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'teacher',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = {
  auth,
  authTeacher
};