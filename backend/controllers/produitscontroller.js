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

// POST /api/produits/:id/vente (admin) : « Vente conclue », décrémente le stock
exports.enregistrerVente = async (req, res) => {
  const quantite = parseInt(req.body.quantite ?? 1, 10);
  if (!Number.isInteger(quantite) || quantite < 1) {
    return res.status(400).json({ erreur: 'Quantité invalide' });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE produits
       SET stock = stock - $1, updated_at = NOW()
       WHERE id = $2 AND stock >= $1
       RETURNING *, (stock <= seuil_alerte) AS stock_faible`,
      [quantite, req.params.id]
    );
    if (rows.length === 0) {
      return res.status(409).json({ erreur: 'Produit introuvable ou stock insuffisant' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
};

// PUT /api/produits/:id (admin) : modifie seulement les champs envoyés
exports.modifier = async (req, res) => {
  const autorises = ['nom', 'description', 'prix', 'stock', 'seuil_alerte', 'image_url', 'categorie', 'actif'];
  const champs = Object.keys(req.body).filter((champ) => autorises.includes(champ));

  if (champs.length === 0) {
    return res.status(400).json({ erreur: 'Aucun champ valide à modifier' });
  }

  const affectations = champs.map((champ, i) => `${champ} = $${i + 1}`).join(', ');
  const valeurs = champs.map((champ) => req.body[champ]);

  try {
    const { rows } = await pool.query(
      `UPDATE produits
       SET ${affectations}, updated_at = NOW()
       WHERE id = $${champs.length + 1}
       RETURNING *`,
      [...valeurs, req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erreur: 'Produit introuvable' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
};

// DELETE /api/produits/:id (admin) : suppression définitive
exports.supprimer = async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM produits WHERE id = $1', [req.params.id]);

    if (rowCount === 0) {
      return res.status(404).json({ erreur: 'Produit introuvable' });
    }
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
};