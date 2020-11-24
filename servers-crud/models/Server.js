const mysql = require('../database/db')

const Server = function (data) {
    this.ip_address  = data.ip_address
    this.server_name = data.server_name
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

Server.findAll = (callback) => {
    mysql.query(`SELECT * FROM servers`, (err, res) => result(callback, err, res))
}

Server.create = (server, callback) => {
    mysql.query(`INSERT INTO servers set ?`, server,  (err, res) => result(callback, err, res))
}

Server.findById = (id, callback) => {
    mysql.query(`SELECT * FROM servers WHERE server_id = ? `, [id], (err, res) => result(callback, err, res))
}

Server.update = (id, server, callback) => {
    mysql.query(`UPDATE servers SET ip_address = ?, server_name = ? WHERE server_id = ?`,
        [server.ip_address, server.server_name, id], (err, res) => result(callback, err, res))
}

Server.delete = (id, callback) => {
    mysql.query(`DELETE FROM servers WHERE server_id = ?`, [id], (err, res) => result(callback, err, res))
}

module.exports = Server