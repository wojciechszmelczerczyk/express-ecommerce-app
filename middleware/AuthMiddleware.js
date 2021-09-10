const jwt = require('jsonwebtoken');

// user model
const User = require('../models/User')

// middleware for routes protecting
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if jwt exists & verify
    if (token) {
        jwt.verify(token, 'agatka secret', (err, decodedToken) => {
            if (err) {
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

// check user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'agatka secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}



module.exports = {
    requireAuth,
    checkUser
}