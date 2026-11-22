const router = require('express').Router();
const { listerCatalogue } = require('../controllers/produitsController');

router.get('/', listerCatalogue);

module.exports = router;