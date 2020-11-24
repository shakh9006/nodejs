const express          = require('express')
const ftpController = require('../controllers/ftpController')

const router = express.Router()

router.get('/', ftpController.findAll)
router.post('/', ftpController.create)
router.get('/:id', ftpController.findById)
router.put('/:id', ftpController.update)
router.delete('/:id', ftpController.delete)

module.exports = router