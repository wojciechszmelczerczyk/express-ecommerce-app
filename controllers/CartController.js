const Cart = require('../models/Cart'); // Model
const User = require('../models/User')
const path = require('path'); // path 
const colors = require('colors');
const jwt = require('jsonwebtoken'); // jwt
const {
    parse
} = require('path');

const getCartOrder = async function (req, res) {



    let total = await Cart.countDocuments();

    let perPage = 5;

    let pages = Math.ceil(total / perPage);

    let pageNumber = (req.query.page == null) ? 1 : req.query.page;
    let startFrom = (pageNumber - 1) * perPage;


    let cartList = await Cart.find({}).skip(startFrom).limit(perPage); // collection

    const token = req.cookies.jwt;

    const user = await jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        return decodedToken;
    })


    const actualUser = await User.findById(user.id);


    if (actualUser.role === 'admin') {
        res.render(path.join(__dirname, '../public/views', 'cart'), {
            cartList, // display every order in cart (admin)
            pages

        })

    } else {
        res.render(path.join(__dirname, '../public/views', 'cart'), {
            cartList: cartList.filter(elem => elem.user_id === user.id),
            pages // display if user_id === recent user
        })
    }
}

const postCartOrder = async function (req, res) {
    const {
        name,
        price
    } = req.body

    // decode token to get recent user id     
    const token = req.cookies.jwt;

    const user = await jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        return decodedToken;
    })


    Cart.create({
        name,
        price,
        user_id: user.id
    })
}

const singleCartOrder = async function (req, res) {

    const id = req.params.id;

    const test = await Cart.findById({
        _id: id
    })

    res.render(path.join(__dirname, '../public/views', 'details'), {
        test
    })
}


// deleting product from cart
const deleteCartOrder = async function (req, res) {

    const id = req.params.id;

    await Cart.findByIdAndDelete(id);

}


module.exports = {
    getCartOrder,
    postCartOrder,
    deleteCartOrder,
    singleCartOrder
}