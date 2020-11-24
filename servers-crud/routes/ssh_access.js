const express             = require('express')
const sshAccessController = require('../controllers/sshAccessController')

const router = express.Router()

router.get('/', sshAccessController.findAll)
router.post('/', sshAccessController.create)
router.get('/:id', sshAccessController.findById)
router.put('/:id', sshAccessController.update)
router.delete('/:id', sshAccessController.delete)

module.exports = router