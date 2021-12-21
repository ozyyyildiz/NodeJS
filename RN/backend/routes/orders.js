const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const orderControllers = require('../controllers/orders');

router.get('/', orderControllers.getOrders);
router.post('/', orderControllers.postOrder);
router.get('/:orderId', orderControllers.getOneOrder);
router.post('/:orderId', orderControllers.deleteOrder);

module.exports = router;