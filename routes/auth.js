const AuthController = require('../controllers/AuthController') // App main controller
const {
    Router
} = require('express')
const router = Router();


// dotenv config
require('dotenv').require()

// mongoose connection
const mongoose = require('mongoose');
const dbURI = process.env.DB_URI
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


router.get('/login', AuthController.login)
router.get('/signin', AuthController.signin)




module.exports = router;