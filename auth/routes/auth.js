const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {
    // Validate data
    const { error } = registerValidation(req.body)
    if (error) res.status(400).send(error.details[0].message)

    // Check if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) res.status(400).send('Email already exist')

    // Password hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create user if everything is okay
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        // Save user data if everything is okay and send response with success status
        const createdUser = await user.save()
        res.send({...user})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    // Validate data
    const { error } = loginValidation(req.body)
    if (error) res.status(400).send(error.details[0].message)

    // Check email exist
    const user = await User.findOne({email: req.body.email})
    if (!user) res.status(400).send('Email or Password is wrong')

    const validPass = bcrypt.compare(req.body.password, user.password)
    if (!validPass) res.status(400).send('Email or Password is wrong')

    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)
    res.header('auth-token', token).send(token)

})

router.get('/', async (req, res) => {
    const users = await User.find()
    await res.json(users)
})


module.exports = router