const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) res.status(401).send('Access Denied!')

    try {
        res.user = jwt.verify(token, process.env.SECRET_TOKEN)
        next()
    } catch (e) {
        res.status(400).send('Invalid token')
    }
}