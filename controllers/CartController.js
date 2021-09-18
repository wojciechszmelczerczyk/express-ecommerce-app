const Cart = require('../models/Cart'); // Model
const path = require('path'); // path 
const colors = require('colors');


const getCartOrder = async function (req, res) {
    const cartList = await Cart.find({});
    res.render(path.join(__dirname, '../public/views', 'cart'), {
        cartList,
    })
}

const postCartOrder = async function (req, res) {
    const {
        name,
        price
    } = req.body

    console.log(name, price)

    Cart.create({
        name,
        price
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