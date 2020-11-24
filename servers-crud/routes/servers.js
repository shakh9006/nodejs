const express          = require('express')
const serverController = require('../controllers/serverController')

const router = express.Router()

router.get('/', serverController.findAll)
router.post('/', serverController.create)
router.get('/:id', serverController.findById)
router.put('/:id', serverController.update)
router.delete('/:id', serverController.delete)

module.exports = router