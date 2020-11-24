const express               = require('express')
const adminAccessController = require('../controllers/adminAccessController')

const router = express.Router()

router.get('/', adminAccessController.findAll)
router.post('/', adminAccessController.create)
router.get('/:id', adminAccessController.findById)
router.put('/:id', adminAccessController.update)
router.delete('/:id', adminAccessController.delete)

module.exports = router