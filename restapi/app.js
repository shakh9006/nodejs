const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const cors = require('cors')
const app = express()
require('dotenv/config')

mongoose.connect('mongodb://localhost/posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('Connected to database!'))

app.use(cors())
app.use(bodyParser.json())
app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    res.json({message: 'Hello app js'})
})

const port = 3033
app.listen(port, () => console.log(`Server Started on http://localhost:${port}`))