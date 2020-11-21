const Joi = require('@hapi/joi');

const createOrUpdateValidation = data => {
    const validation = {
        first_name : Joi.string().min(3).max(255).required(),
        last_name  : Joi.string().min(3).max(255).required(),
        email      : Joi.string().min(6).required().email(),
        phone      : Joi.string().min(6).required(),
        status     : Joi.number().required(),
        created_at : Joi.date().required(),
        updated_at : Joi.date().required(),
    }

    return Joi.validate(data, validation)
}

module.exports.createOrUpdateValidation = createOrUpdateValidation