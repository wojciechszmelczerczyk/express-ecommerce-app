const path = require('path'); // path 


const getCartOrder = function (req, res) {
    res.render(path.join(__dirname, '../public/views', 'cart'))
}

const postCartOrder = function (req, res) {
    res.send('test')
}


module.exports = {
    getCartOrder,
    postCartOrder
}