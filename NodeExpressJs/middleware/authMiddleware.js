const jwt = require('jsonwebtoken');

// same secret as used in authController
const SECRET_KEY = 'super_secrete_key16'; 

const authMiddleware = (req, res, next) => {
  // ✅ Get token from cookie
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // ✅ Decode token and attach user info
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
