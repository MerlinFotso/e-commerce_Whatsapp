const router = require('express').Router();
const verifierToken = require('../middleware/auth');
const {
  listerCatalogue, creer, enregistrerVente, modifier, supprimer,
} = require('../controllers/produitsController');

router.get('/', listerCatalogue);                            // public
router.post('/', verifierToken, creer);                      // protégé
router.post('/:id/vente', verifierToken, enregistrerVente);  // protégé
router.put('/:id', verifierToken, modifier);                 // protégé
router.delete('/:id', verifierToken, supprimer);             // protégé

module.exports = router;