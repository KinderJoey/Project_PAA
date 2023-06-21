const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies.jwtToken;
  if (token) {
    jwt.verify(token, 'Rahasia', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
