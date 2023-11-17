const express = require ('express');
const mongoose = require ('mongoose')
const productRoute = require('./routes/products')
const utenteRoute = require('./routes/utente')
const loginRoute = require('./routes/login')
const payRoute = require('./routes/payment')


const cors = require('cors');
const path = require('path');



const PORT = 5050;
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use('/', productRoute)
app.use('/', utenteRoute)
app.use('/', loginRoute)
app.use('/', payRoute)


mongoose.connect('mongodb+srv://metbor23:c4EWjZFAixwTf@zabusa.yzwygw5.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error during db connection'))
db.once('open', () => {
    console.log("database caricato");
})

app.listen(PORT, () => console.log(`server funzionante alla porta ${PORT}`))

