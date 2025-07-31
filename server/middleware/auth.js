const jwt = require('jsonwebtoken');

function authMiddleware(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token chybí' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (role && decoded.role !== role && decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Přístup zamítnut' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Neplatný token' });
    }
  };
}

module.exports = authMiddleware;
