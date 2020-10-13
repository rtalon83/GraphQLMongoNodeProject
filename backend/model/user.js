const mongoose = require('mongoose') // import mongoose
const Schema = mongoose.Schema;

// Create the Schema for Mongoose that corresponds to that type we set in GraphQL
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = {
    User: mongoose.model('User', userSchema),
    UserSchema: userSchema
}