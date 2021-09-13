// mongoose import
const mongoose = require('mongoose');

// destructurization of mongoose Schema into variable;
const {
    Schema
} = mongoose;

// creating user schema
const productSchema = new Schema({
    name: String,
    price: String,
    description: String
})

// creating model of User basing on schema
const Product = mongoose.model('product', productSchema);

module.exports = Product;