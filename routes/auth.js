const AuthController = require('../controllers/AuthController') // App main controller
const {
    Router
} = require('express')
const router = Router();

// mongoose connection
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://test123:YK73pA9SmGoJd2qp@cluster0.pzawe.mongodb.net/PetShop'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


router.get('/login', AuthController.login)
router.get('/signin', AuthController.signin)




module.exports = router;