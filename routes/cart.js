const CartController = require('../controllers/CartController'); // cart controller
const {
    Router
} = require('express');

const {
    requireAuth
} = require('../middleware/AuthMiddleware')

const router = Router();


router.route('/cart').get(requireAuth, CartController.getCartOrder).post(CartController.postCartOrder);



module.exports = router;