const express  = require('express')
const Students = require('../controllers/Students')

const router = express.Router()

router.get('/students', Students.findAll)

router.get('/students/:id', Students.findById)

router.post('/students', Students.create)

router.put('/students/:id', Students.update)

router.delete('/students/:id', Students.delete)

module.exports = router