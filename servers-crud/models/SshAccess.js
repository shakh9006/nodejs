const mysql = require('../database/db')

const SshAccess = function (data) {
    this.port        = data.port
    this.login       = data.login
    this.password    = data.password
    this.server_id   = data.server_id
    this.created_at  = new Date()
    this.updated_at  = new Date()
}

const result = (callback, err, res) => {
    if (err) {
        callback(err, null)
    } else {
        callback(null, res)
    }
}

SshAccess.findAll = (callback) => {
    mysql.query(`SELECT * FROM ssh_accesses`, (err, res) => result(callback, err, res))
}

SshAccess.create = (ssh_access, callback) => {
    ssh_access.port = ssh_access.port || "22"
    mysql.query(`INSERT INTO ssh_accesses set ?`, ssh_access,  (err, res) => result(callback, err, res))
}

SshAccess.findById = (id, callback) => {
    mysql.query(`SELECT * FROM ssh_accesses WHERE ssh_access_id = ? `, [id], (err, res) => result(callback, err, res))
}

SshAccess.update = (id, ssh_access, callback) => {
    const port = ssh_access.port || "22"
    mysql.query(`UPDATE ssh_accesses SET login = ?, password = ?, port = ?, server_id = ? WHERE ssh_access_id = ?`,
        [ssh_access.host, ssh_access.login, ssh_access.password, port, ssh_access.server_id, ssh_access.website_id, id], (err, res) => result(callback, err, res))
}

SshAccess.delete = (id, callback) => {
    mysql.query(`DELETE FROM ssh_accesses WHERE ssh_access_id = ?`, [id], (err, res) => result(callback, err, res))
}

module.exports = SshAccess