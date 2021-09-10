const AuthController = require('../controllers/AuthController') // App main controller
const {
    Router
} = require('express')
const router = Router();


// dotenv config
require('dotenv').config()

// mongoose connection
const mongoose = require('mongoose');
const dbURI = process.env.DB_URI
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


router.route('/login')
    .get(AuthController.loginGet)
    .post(AuthController.loginPost)

router.route('/signin')
    .get(AuthController.signinGet)
    .post(AuthController.signinPost)

router.get('/logout', AuthController.logout)

module.exports = router;