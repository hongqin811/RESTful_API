require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)

// EXPRESS JS
app.use(express.json())

// MONGODB
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// ROUTER
const viewersRouter = require('./routes/viewers')
app.use('/viewers', viewersRouter)

// SERVER
app.listen(3000, ()=> console.log('Server Started'))