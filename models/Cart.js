// mongoose import
const mongoose = require('mongoose');

// destructurization of mongoose Schema into variable;
const {
    Schema
} = mongoose;

// creating user schema
const cartSchema = new Schema({
    name: String,
    price: String,
    user_id: String,

})

// creating model of User basing on schema
const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;