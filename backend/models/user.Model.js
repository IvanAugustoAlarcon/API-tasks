const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Teclea un nombre']
    },
    email: {
        type: String,
        required: [true, 'Teclea un email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Teclea un password']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)