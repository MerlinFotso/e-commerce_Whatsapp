const router = require('express').Router();
const verifierToken = require('../middleware/auth');
const { listerCatalogue, creer } = require('../controllers/produitsController');

router.get('/', listerCatalogue);            // public
router.post('/', verifierToken, creer);      // protégé

module.exports = router;