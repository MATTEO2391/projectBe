const mongoose = require('mongoose')

const UtentiSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    cognome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        min: 8
    },

}, { timestamps: true, strict: true })

module.exports = mongoose.model('UtentiModel', UtentiSchema, 'utenti')