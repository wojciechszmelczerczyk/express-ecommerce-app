const Product = require("../models/Product"); // Model
const Cart = require("../models/Cart");
const colors = require("colors");
const jwt = require("jsonwebtoken");
const path = require("path");

const getProducts = async function (req, res) {
  if (!Object.keys(req.query).length) {
    const token = req.cookies.jwt; // token
    const user = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decodedToken) => {
        return decodedToken;
      }
    ); // get user id from jwt decomposition

    const productList = await Product.find({});
    const orderNumber = await Cart.countDocuments({
      user_id: user.id,
    }); // number of orders in cart (for specific user with unique id).
    //Passed to EJS with length property to display number of products in cart

    res.render(path.join(__dirname, "../public/views", "product"), {
      productList,
      orderNumber,
    });
  } else if (Object.keys(req.query).length) {
    const token = req.cookies.jwt; // token

    const user = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decodedToken) => {
        return decodedToken;
      }
    ); // get user id from jwt decomposition

    const filteredProduct = await Product.find({
      name: req.query.search,
    });
    const orderNumber = await Cart.countDocuments({
      user_id: user.id,
    }); // number of orders in cart (for specific user with unique id).
    //Passed to EJS with length property to display number of products in cart

    res.render(path.join(__dirname, "../public/views", "filterProducts"), {
      filteredProduct,
      orderNumber,
    });
  }
};

const getMainPage = async function (req, res) {
  const token = req.cookies.jwt; // token

  const user = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decodedToken) => {
      return decodedToken;
    }
  ); // get user id from jwt decomposition

  const productList = await Product.find({});

  res.render(path.join(__dirname, "../public/views", "index"), {
    productList,
  });
};

const getAboutSubpage = async function (req, res) {
  res.render(path.join(__dirname, "../public/views", "about"));
};

const getServicesSubpage = async function (req, res) {
  res.render(path.join(__dirname, "../public/views", "services"));
};

const getContactSubpage = async function (req, res) {
  res.render(path.join(__dirname, "../public/views", "contact"));
};

const getSingleSubpage = async function (req, res) {
  res.render(path.join(__dirname, "../public/views", "contact"));
};

// API
module.exports = {
  getProducts,
  getMainPage,
  getAboutSubpage,
  getServicesSubpage,
  getContactSubpage,
  getSingleSubpage,
};
