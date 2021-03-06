const CartController = require('../controllers/CartController'); // cart controller
const {
    Router
} = require('express');

const {
    requireAuth
} = require('../middleware/AuthMiddleware')

const router = Router();


router.route('/cart').get(requireAuth, CartController.getCartOrder).post(CartController.postCartOrder);

// route responsible for deleting product from cart and getting single product from cart 
router.route('/cart/:id').delete(CartController.deleteCartOrder).get(CartController.singleCartOrder)


module.exports = router;