// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie que le token est présent et bien formaté
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou mal formé' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attache les infos de l'utilisateur au req
    req.user = decoded;

    // Passe au contrôleur suivant
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = authMiddleware;