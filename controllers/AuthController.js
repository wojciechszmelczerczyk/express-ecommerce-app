const User = require('../models/User');

const path = require('path');
const bcrypt = require('bcrypt');

const login = (req, res) => {
    res.render(path.join(__dirname, '../public/views', 'login'))
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
        res.status(201).json(user)
    } catch (err) {
        res.status(400).send('error, user not created')
    }

}


module.exports = {
    login,
    signinGet,
    signinPost
}