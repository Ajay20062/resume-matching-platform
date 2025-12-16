// Placeholder auth middleware
const auth = (req, res, next) => {
  // In a real app, verify JWT token
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  // Dummy check
  if (token !== 'Bearer dummy-token') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next();
};

module.exports = auth;
