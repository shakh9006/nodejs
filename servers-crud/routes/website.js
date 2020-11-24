const express           = require('express')
const websiteController = require('../controllers/websiteController')

const router = express.Router()

router.get('/', websiteController.findAll)
router.post('/', websiteController.create)
router.get('/:id', websiteController.findById)
router.put('/:id', websiteController.update)
router.delete('/:id', websiteController.delete)

module.exports = router