const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ erreur: 'Identifiant et mot de passe requis' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
    const admin = rows[0];

    // Même message dans les deux cas : on ne révèle pas si l'identifiant existe
    const valide = admin && (await bcrypt.compare(password, admin.password_hash));
    if (!valide) {
      return res.status(401).json({ erreur: 'Identifiants incorrects' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
};