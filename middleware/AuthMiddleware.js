const jwt = require('jsonwebtoken');

// user model
const User = require('../models/User')

// middleware for routes protecting
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if jwt exists & verify
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect('/login')
            } else {
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
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null;
                next();
            } else {
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