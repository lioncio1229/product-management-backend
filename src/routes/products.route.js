const express = require('express');
const productsController = require('../controllers/products.controller');
const validation = require('../middleware/jwtValidation');

const router = express.Router();

router.get('/', validation(), productsController.getProducts);
router.get('/:id', validation(), productsController.getProduct);
router.post('/', validation(), productsController.addProduct);
router.put('/:id', validation(), productsController.updateProduct);
router.delete('/:id', validation(), productsController.deleteProduct);

module.exports = router;
