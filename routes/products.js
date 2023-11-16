const express = require('express');
const ProductModel = require('../models/product');
const products = express.Router()


products.get('/products', async (req, res) => {  
    
    try {
        const products = await ProductModel.find()
            
        res.status(200)
            .send({
                statusCode: 200,
                products
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "errore interno del server"
            })
    }
})

products.get('/products/:productId', async (req, res) => {  

    const { productId } = req.params

    try {
           
        const products = await ProductModel.findById(productId)

        res.status(200)
            .send({
                statusCode: 200,
                products
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "errore interno del server"
            })
    }
})

products.post('/products/create', async (req, res) => {
    const newProducts = new ProductModel({
        nome: req.body.nome,
        category: req.body.category,
        prezzo: req.body.prezzo,
        cover1: req.body.cover1,
        description: req.body.description,
    })

    try {
        const product = await newProducts.save()
        res.status(200)
            .send({
                statusCode: 200,
                message: "prodotto salvato",
                payload: product
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "errore interno del server"
            })
    }
})

products.patch('/products/update/:productId', async (req, res) => {
    const { productId } = req.params

    const productExist = await ProductModel.findById(productId)

    if (!productExist) {
        return res.status(404).send({
            statusCode: 404,
            message: "il prodotto non esiste"
        })
    }

    try {
        const productToUpdate = req.body;
        const options = { new: true }
        const result = await ProductModel.findByIdAndUpdate(productId, productToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: "prodotto modificato",
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

products.delete('/products/delete/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const product = await ProductModel.findByIdAndDelete(productId)
        if (!product) {
            return res.status(404).send({
                statusCode: 404,
                message: "prodotto gia cancellato"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Prodotto cancellato"
        })


    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "errore interno del server"
            })
    }
})



module.exports = products