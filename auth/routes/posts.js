const router = require('express').Router()
const verify = require('../verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        success: true,
        message: 'Has Access',
    })
})

module.exports = router