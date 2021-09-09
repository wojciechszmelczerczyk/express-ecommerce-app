const path = require('path'); // path 


const getCartOrder = function (req, res) {
    res.render(path.join(__dirname, '../public/views', 'cart'))
}


module.exports = {
    getCartOrder
}