const path = require('path'); // Internal node package for paths


const login = (req, res) => {
    res.render(path.join(__dirname, '../public/views', 'login'))
}

const signin = (req, res) => {
    res.render(path.join(__dirname, '../public/views', 'signin'))

}


module.exports = {
    login,
    signin
}