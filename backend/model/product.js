const mongoose = require('mongoose') // import mongoose
const Schema = mongoose.Schema

// Create the Schema for Mongoose that corresponds to that type we set in GraphQL
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = {
    Product: mongoose.model('Product', productSchema),
    ProductSchema: productSchema
}