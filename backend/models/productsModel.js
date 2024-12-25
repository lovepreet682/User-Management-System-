const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    }
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
