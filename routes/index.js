const PetShopController = require('../controllers/PetShopController') // App main controller
const {
    Router
} = require('express')
const router = Router();

// dotenv config
require('dotenv').config();

// mongoose connection
const mongoose = require('mongoose');
const dbURI = process.env.DB_URI
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// routing
router.get('/', PetShopController.getMainPage)

router.get('/about', PetShopController.getAboutSubpage)

router.get('/product', PetShopController.getProducts)

router.get('/services', PetShopController.getServicesSubpage)

router.get('/contact', PetShopController.getContactSubpage)

router.get('/single', PetShopController.getSingleSubpage)


module.exports = router;