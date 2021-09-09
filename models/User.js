// mongoose import
const mongoose = require('mongoose');

// bcrypt 

const bcrypt = require('bcrypt')

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

// call a function before saving doc to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// creating model of User basing on schema
const User = mongoose.model('user', userSchema);

module.exports = User;