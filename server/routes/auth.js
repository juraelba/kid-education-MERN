const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
  isAdmin: (req, res, next) => {
    const { body: { user_role } } = req;
    if (user_role!=='admin') {
      // user's role is not authorized
      return res.status(401).json({ message: 'Current user is not admin.' });
    }
    // authentication and authorization successful
    next();
  }
    
};

module.exports = auth;