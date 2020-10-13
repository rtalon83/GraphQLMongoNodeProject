const { ProductSchema } = require('./product');

const mongoose = require('mongoose') // import mongoose
const Schema = mongoose.Schema

// Create the Schema for Mongoose that corresponds to that type we set in GraphQL
const productLineSchema = new Schema({
    product: {
        type: ProductSchema,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = {
    ProductLine: mongoose.model('ProductLine', productLineSchema),
    ProductLineSchema: productLineSchema
}