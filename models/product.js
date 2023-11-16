const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    nome:{
        type: String,
    },

    category:{
        type: String,
    },

    prezzo:{
        type: Number,
    },

    cover1:{
        type: String,
    },

    description:{
        type: String,
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model('ProductModel', ProductSchema, 'product')