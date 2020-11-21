const express  = require('express')
const router   = express.Router()
const Student  = require('../controllers/StudentController')

router.get('/students', Student.findAll)

router.get('/students/:id', Student.findById)

router.post('/students', Student.create)

router.put('/students/:id', Student.update)

router.delete('/students/:id', Student.delete)

module.exports = router