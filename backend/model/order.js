const { ProductLineSchema } = require('./productline');
const { UserSchema } = require('./user');

const mongoose = require('mongoose') // import mongoose
const Schema = mongoose.Schema

// Create the Schema for Mongoose that corresponds to that type we set in GraphQL
const orderSchema = new Schema({
    product: {
        type: [ProductLineSchema],
        required: true
    },
    user: {
        type: UserSchema,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema) // create and export the model