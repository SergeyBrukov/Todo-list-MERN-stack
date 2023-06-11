const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  console.log(req.headers.authorization.split('Bearer')[1]);
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split('Bearer')[1].trim();
    if (!token) {
      return res.status(400).json({ message: 'Not authorization' });
    }
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json('Not authorization');
  }
};
