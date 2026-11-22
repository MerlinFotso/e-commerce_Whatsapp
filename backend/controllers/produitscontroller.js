const pool = require('../config/db');

// GET /api/produits : catalogue public (produits actifs uniquement)
exports.listerCatalogue = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, nom, description, prix, stock, image_url, categorie
       FROM produits
       WHERE actif = TRUE
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
};