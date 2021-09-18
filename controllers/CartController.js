const Cart = require('../models/Cart'); // Model
const path = require('path'); // path 


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


// deleting product from cart
const deleteCartOrder = async function (req, res) {
    const id = req.params.id;

    console.log(id)
    Cart.findByIdAndDelete({
        _id: mongo.ObjectId(id)
    })

}


module.exports = {
    getCartOrder,
    postCartOrder,
    deleteCartOrder,
}