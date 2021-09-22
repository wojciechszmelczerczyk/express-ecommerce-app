// mongoose import
const mongoose = require('mongoose');

//email validator
const {
    isEmail
} = require('validator');

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
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    role: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Password is to short. Minimum password length is 6 characters']
    }
})


// call a function before saving doc to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({
        email
    })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


// creating model of User basing on schema
const User = mongoose.model('user', userSchema);


module.exports = User;