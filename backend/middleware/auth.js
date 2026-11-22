const jwt = require('jsonwebtoken');

// Protège une route : exige l'en-tête  Authorization: Bearer <token>
module.exports = function verifierToken(req, res, next) {
  const entete = req.headers.authorization || '';
  const token = entete.startsWith('Bearer ') ? entete.slice(7) : null;
  if (!token) return res.status(401).json({ erreur: 'Authentification requise' });

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erreur: 'Token invalide ou expiré' });
  }
};