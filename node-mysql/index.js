const cors           = require('cors')
const express        = require('express')
const config         = require('./config')
const bodyParser     = require('body-parser')
const studentsRouter = require('./routes/students')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use('/api/v1', studentsRouter)

app.listen(config.port, () => {
    console.log(`Server up and listening on ${config.url}`)
})