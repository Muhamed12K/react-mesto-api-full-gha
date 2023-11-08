const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  const secretSigningKey = '0f05cafa879700c8e152aa60d5f9543b2d7e3f5afc522bbca634c7205a1d74d0';
  const bearer = 'Bearer ';

  // check if method is options

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }

  const token = authorization.replace(bearer, 'jwt');
  let payload;

  try {
    payload = jwt.verify(token, secretSigningKey);
  } catch (err) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }

  req.user = payload;

  return next();
};
