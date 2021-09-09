const Product = require('../models/Product'); // Model

const path = require('path'); // Internal node package for paths


//TODO: FIX 
const getProducts = async function (req, res) {
    // const productList = await Product.find({}
    res.render(path.join(__dirname, '../public/views', 'product'), {
        // productList
    })
}

const getMainPage = async function (req, res) {
    res.render(path.join(__dirname, '../public/views', 'index'));
}

const getAboutSubpage = async function (req, res) {
    res.render(path.join(__dirname, '../public/views', 'about'));
}


const getServicesSubpage = async function (req, res) {
    res.render(path.join(__dirname, '../public/views', 'services'));

}

const getContactSubpage = async function (req, res) {
    res.render(path.join(__dirname, '../public/views', 'contact'));
}

const getSingleSubpage = async function (req, res) {
    res.render(path.join(__dirname, '../public/views', 'contact'));
}


// API
module.exports = {
    getProducts,
    getMainPage,
    getAboutSubpage,
    getServicesSubpage,
    getContactSubpage,
    getSingleSubpage
}