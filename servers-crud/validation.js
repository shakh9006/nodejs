const Joi   = require('@hapi/joi')
const mysql = require('./database/db')

const Validator = {}

Validator.createOrUpdateServer = data => {
    return Joi.validate(data, {
        ip_address  : Joi.string().min(3).max(255).required(),
        server_name : Joi.string().min(3).max(255).required(),
        created_at  : Joi.date().required(),
        updated_at  : Joi.date().required(),
    })
}

Validator.createOrUpdateWebsite = data =>{
    return Joi.validate(data, {
        website_name : Joi.string().min(3).max(255).required(),
        website_url  : Joi.string().min(3).max(255).required(),
        created_at   : Joi.date().required(),
        updated_at   : Joi.date().required(),
    })
}

Validator.createOrUpdateFtp = data => {
    return Joi.validate(data, {
        port       : Joi.string(),
        host       : Joi.string().min(3).max(255).required(),
        login      : Joi.string().min(3).max(255).required(),
        password   : Joi.string().min(3).max(255).required(),
        server_id  : Joi.number().required(),
        website_id : Joi.number().required(),
        created_at : Joi.date().required(),
        updated_at : Joi.date().required(),
    })
}

Validator.createOrUpdateSsh = data => {
    return Joi.validate(data, {
        port       : Joi.string(),
        login      : Joi.string().min(3).max(255).required(),
        password   : Joi.string().min(3).max(255).required(),
        server_id  : Joi.number().required(),
        created_at : Joi.date().required(),
        updated_at : Joi.date().required(),
    })
}

Validator.createOrUpdateAdminAccess = data => {
    return Joi.validate(data, {
        login      : Joi.string().min(3).max(255).required(),
        password   : Joi.string().min(3).max(255).required(),
        website_id : Joi.number().required(),
        created_at : Joi.date().required(),
        updated_at : Joi.date().required(),
    })
}

Validator.validate = (res, type, data) => {
    if ( !Validator[type] ) return  false
    const { error } = Validator[type](data)
    if ( error )
        res.status(400)
            .send({success: false, body: [], message: error.details[0].message})
    return !error
}

Validator.checkId = (res, id) => {
    const parsedId = parseInt(id)
    if ( parsedId !== parsedId )
        res.status(400)
            .send({success: false, body: [], message: 'Invalid id'})
    return parsedId !== parsedId
}

Validator.rowExists = async (res, tableName, id) => {
    let result = {
        success: false,
        body   : null,
        message: `Table ${tableName} is not exists`
    }

    const ids = {
        'ftps'         : 'ftp_id',
        'servers'      : 'server_id',
        'websites'      : 'website_id',
        'ssh_accesses' : 'ssh_access_id',
        'admin_access' : 'admin_access_id'
    }

    if (!ids[tableName]) {
        return new Promise((resolve) => resolve(result))
    }

    await mysql.query(`SELECT * FROM ${tableName} WHERE ${ids[tableName]} = ? `, [id], (err, sql_res) => {
        console.log('123')
        if (!(sql_res && sql_res.length > 0))
            result.message = `Not such an id ${id} in the table ${tableName}`
        else
            return result = {}
    })

    return await new Promise((resolve, reject) => resolve(result))
}

module.exports = Validator
