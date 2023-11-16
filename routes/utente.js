const express = require('express');
const UtentiModel = require('../models/utenti');
const utente = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
const bcrypt = require('bcrypt');
const verify = require('../middleware/Token')


utente.get('/utente', verify, async (req, res) => {
    try {
        res.status(200)
            .send({
                statusCode: 200
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore del server"
            })
    }
})

utente.post('/utente/create', async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUtente = new UtentiModel({
        nome: req.body.nome,
        cognome: req.body.cognome,
        email: req.body.email,
        password: hashedPassword,

    })

    try {
        const utn = await newUtente.save()
        res.status(200)
            .send({
                statusCode: 200,
                message: "utente salvato",
                payload: utn
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore del server"
            })
    }
})

utente.patch('/utente/update/utentId', async (req, res) => {
    const { utentId } = req.params;

    const utenteEsiste = await UtentiModel.findById(utentId)

    if (!utenteEsiste) {
        return res.status(404).send({
            statusCode: 404,
            message: "l'utente non esiste"
        })
    }

    try {
        const utenteToUpdate = req.body;
        const options = { new: true };
        const result = await UtentiModel.findByIdAndUpdate(utentId, utenteToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: "utente modificato",
            result
        })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "errore interno del server"
            })
    }
})

utente.delete('/utente/delete/utentId', async (req, res) => {
    const { utentId } = req.params;
    try {
        const utn = UtentiModel.findByIdAndDelete(utentId)
        if (!utn) {
            return res.status(404).send({
                statusCode: 404,
                message: "utente gia cancellato"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Utente cancellato"
        })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "errore interno del server"
            })
    }
})

module.exports = utente