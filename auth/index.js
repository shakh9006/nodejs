const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config();

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')

const app = express()
app.use(express.json())

// Db Connection
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('Db connected successfully!'))

// Register routes
app.use('/api/user', authRoutes)
app.use('/api/posts', postRoutes)
app.listen(3300, () => console.log('Server up and running!'))