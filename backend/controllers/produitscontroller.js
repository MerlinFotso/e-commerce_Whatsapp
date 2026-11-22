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

// POST /api/produits (admin) : ajoute un produit
exports.creer = async (req, res) => {
  const { nom, description, prix, stock = 0, seuil_alerte = 3, image_url, categorie } = req.body;
  if (!nom || prix == null) {
    return res.status(400).json({ erreur: 'nom et prix sont requis' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO produits (nom, description, prix, stock, seuil_alerte, image_url, categorie)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [nom, description, prix, stock, seuil_alerte, image_url, categorie]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
};