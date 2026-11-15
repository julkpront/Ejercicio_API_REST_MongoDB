const express = require('express');
const router = express.Router();
const providersController = require('../controllers/providers.controllers');

router.get('/', providersController.getProviders);
router.post('/', providersController.createProvider);
router.put('/', providersController.updateProvider);
router.delete('/', providersController.deleteProvider);

module.exports = router;