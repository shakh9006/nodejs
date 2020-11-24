const mysql = require('../database/db')

const AdminAccess = function (data) {
    this.login      = data.login
    this.password   = data.password
    this.website_id = data.website_id
    this.created_at = new Date()
    this.updated_at = new Date()
}

const result = (callback, err, res) => {
    if (err) {
        callback(err, null)
    } else {
        callback(null, res)
    }
}

AdminAccess.findAll = (callback) => {
    mysql.query(`SELECT * FROM admin_accesses`, (err, res) => result(callback, err, res))
}

AdminAccess.create = (admin_access, callback) => {
    mysql.query(`INSERT INTO admin_accesses set ?`, admin_access,  (err, res) => result(callback, err, res))
}

AdminAccess.findById = (id, callback) => {
    mysql.query(`SELECT * FROM admin_accesses WHERE admin_access_id = ? `, [id], (err, res) => result(callback, err, res))
}

AdminAccess.update = (id, admin_access, callback) => {
    mysql.query(`UPDATE admin_accesses SET login = ?, password = ?, website_id = ? WHERE admin_access_id = ?`,
        [admin_access.login, admin_access.password, admin_access.website_id, id], (err, res) => result(callback, err, res))
}

AdminAccess.delete = (id, callback) => {
    mysql.query(`DELETE FROM admin_accesses WHERE admin_access_id = ?`, [id], (err, res) => result(callback, err, res))
}

module.exports = AdminAccess