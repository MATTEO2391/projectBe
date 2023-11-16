const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const UtentiModel = require('../models/utenti')
const jwt = require('jsonwebtoken')
require('dotenv').config()

login.post('/login', async (req, res) => {
    const utente = await UtentiModel.findOne({ email: req.body.email })

    if (!utente) {
        return res.status(404).send({
            message: 'nome utente errato',
            statusCode: 404
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, utente.password)

    if (!validPassword) {
        return res.status(400).send({
            statusCode: 400,
            message: 'email o password errati'
        })
    }

    const token = jwt.sign({
        id: utente._id,
        nome: utente.nome,
        cognome: utente.cognome,
        email: utente.email,

    }, process.env.JWT_SECRET, { expiresIn: '24h' })


    res.header('Authorization', token).status(200).send({
        message: "Login effettuato con successo",
        statusCode: 200,
        token
    })
})

module.exports = login;