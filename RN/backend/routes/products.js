const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const productControllers = require('../controllers/products');

router.get('/', productControllers.getAllProducts);
router.post('/', productControllers.postProduct);
router.get('/:productId', productControllers.getOneProduct);
router.post(':id', productControllers.updateProduct);
router.post('/:productId', productControllers.deleteProduct);

module.exports = router;