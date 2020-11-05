const Joi = require('@hapi/joi')

const registerValidation = data => {
    const validation = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, validation)
}

const loginValidation = data => {
    const validation = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, validation)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation