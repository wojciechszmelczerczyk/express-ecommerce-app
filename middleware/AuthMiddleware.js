const jwt = require('jsonwebtoken');

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


module.exports = {
    requireAuth
}