
const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    tittle: {
        type: String,
        trim: true,
        required: true
    },
    gia: {
        type: Number,
        trim: true,
        required: true
    },
    mota: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    phanloai: {
        type: String,
        required: true
    },
    soluong: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        default: 0,
    },
    daban: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)