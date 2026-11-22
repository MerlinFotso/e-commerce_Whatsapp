// Usage : node scripts/creer-admin.js <username> <motdepasse>
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

(async () => {
  const [username, password] = process.argv.slice(2);

  if (!username || !password) {
    console.error('Usage : node scripts/creer-admin.js <username> <motdepasse>');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('Le mot de passe doit contenir au moins 8 caractères.');
    process.exit(1);
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const { rowCount } = await pool.query(
      'INSERT INTO admin (username, password_hash) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING',
      [username, hash]
    );
    console.log(rowCount ? `Admin "${username}" créé.` : `L'admin "${username}" existe déjà.`);
  } catch (err) {
    console.error('Erreur :', err.message);
  } finally {
    await pool.end();
  }
})();