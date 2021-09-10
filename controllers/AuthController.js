// User model
const User = require('../models/User');

// jwt
const jwt = require('jsonwebtoken');

// handle an errors
const handleErrors = err => {
    console.log(err.message, err.code)
    let errors = {
        email: '',
        password: ''
    }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
    }

    // duplicate error code (unique email violation)
    if (err.code === 11000) {
        errors.email = 'this email is already registered'
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({
            properties
        }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

// create token func

const maxAge = 60 * 60 * 24 * 3; // value of 3 days in seconds


const createToken = (id) => {
    return jwt.sign({
        id
    }, 'agatka secret', {
        expiresIn: maxAge
    });
}


const path = require('path');

const loginGet = (req, res) => {
    res.render(path.join(__dirname, '../public/views', 'login'))
}

const loginPost = async (req, res) => {
    // code here
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id); // creating token

        res.cookie('jwt', token, {
            httpOnly: true,
            expiresIn: maxAge * 1000
        })
        res.status(200).json({
            user: user._id
        });
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({
            errors
        });
    }
    // take value from login form send with fetch to backend, compare with already existing password, then send jwt if all good
}

const signinGet = (req, res) => {
    res.render(path.join(__dirname, '../public/views', 'signin'))

}

const signinPost = async (req, res) => {
    // extract email and password from request to seprate variables
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.create({
            email,
            password
        })

        const token = createToken(user._id); // creating token

        res.cookie('jwt', token, {
            httpOnly: true,
            expiresIn: maxAge * 1000
        })
        res.status(201).json({
            user: user._id
        });
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({
            errors
        });
    }

}

const logout = async (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect('/')
}



module.exports = {
    loginGet,
    loginPost,
    signinGet,
    signinPost,
    logout
}