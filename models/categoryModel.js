const mongose = require('mongoose')

const categorySchema = new mongose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }

}, {
    timestamps: true
})
module.exports = mongose.model('Category', categorySchema)
