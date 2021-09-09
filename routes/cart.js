const CartController = require('../controllers/CartController'); // cart controller
const {
    Router
} = require('express');

const router = Router();


router.route('/cart').get(CartController.getCartOrder);



module.exports = router;