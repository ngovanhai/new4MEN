
const mongose = require('mongoose')

const cartOderSchema = new mongose.Schema({
    name: {
        type: String,
    },
    idOder: {
        type: Number,
    },
    address: {
        type: String,
        unique: false

    },
    email: {
        type: String,
        unique: false

    },
    oder: {
        type: Object,

    },
    phone: {
        type: String,
    },
    total: {
        type: String,
    },
    check: {
        type: Boolean,
        default: false,

    }

}, {
    timestamps: true
})
module.exports = mongose.model('Oder', cartOderSchema)

