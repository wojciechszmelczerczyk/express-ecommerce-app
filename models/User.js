// mongoose import
const mongoose = require('mongoose');

// destructurization of mongoose Schema into variable;
const {
    Schema
} = mongoose;

// creating user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

// creating model of User basing on schema
const User = mongoose.model('user', userSchema);

module.exports = User;