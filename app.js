// express
const express = require('express');
const app = express();

// routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');

// dotenv config
require('dotenv').config();

// cookie-parser
const cookieParser = require('cookie-parser');

// custom middleware for auth
const {
    requireAuth,
    checkUser
} = require('./middleware/AuthMiddleware');

// middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());


// mongoose connection
const mongoose = require('mongoose');
const dbURI = process.env.DB_URI //add to env 
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// port 
const port = process.env.PORT || 3000;

// listening on port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`); // npm start
});

// ejs engine 
app.set('view engine', 'ejs');


// middleware for static files
app.use(express.static('public'));

// routing
app.get('*', checkUser) // apply for every get method route
app.use(indexRoute);
app.use(authRoute);
app.use(cartRoute);