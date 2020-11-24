const mysql = require('../database/db')

const Ftp = function (data) {
    this.host        = data.host
    this.port        = data.port
    this.login       = data.login
    this.password    = data.password
    this.server_id   = data.server_id
    this.website_id  = data.website_id
    this.created_at  = new Date()
    this.updated_at  = new Date()
}

const result = (callback, err, res) => {
    if ( err ) {
        callback(err, null)
    } else {
        callback(null, res)
    }
}

Ftp.findAll = (callback) => {
    mysql.query(`SELECT * FROM ftps`, (err, res) => result(callback, err, res))
}

Ftp.create = (ftp, callback) => {
    mysql.query(`INSERT INTO ftps set ?`, ftp,  (err, res) => result(callback, err, res))
}

Ftp.findById = (id, callback) => {
    mysql.query(`SELECT * FROM ftps WHERE ftp_id = ? `, [id], (err, res) => result(callback, err, res))
}

Ftp.update = (id, ftp, callback) => {
    const port = ftp.port ? ftp.port : 21
    mysql.query(`UPDATE ftps SET host = ?, login = ?, password = ?, port = ?, server_id = ?, website_id = ? WHERE ftp_id = ?`,
        [ftp.host, ftp.login, ftp.password, port, ftp.server_id, ftp.website_id, id], (err, res) => result(callback, err, res))
}

Ftp.delete = (id, callback) => {
    mysql.query(`DELETE FROM ftps WHERE ftp_id = ?`, [id], (err, res) => result(callback, err, res))
}

module.exports = Ftp