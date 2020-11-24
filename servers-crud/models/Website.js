const mysql = require('../database/db')

const Website = function (data) {
    this.website_name  = data.website_name
    this.website_url   = data.website_url
    this.created_at    = new Date()
    this.updated_at    = new Date()
}

const result = (callback, err, res) => {
    if (err) {
        callback(err, null)
    } else {
        callback(null, res)
    }
}

Website.findAll = (callback) => {
    mysql.query(`SELECT * FROM websites`, (err, res) => result(callback, err, res))
}

Website.create = (website, callback) => {
    mysql.query(`INSERT INTO websites set ?`, website,  (err, res) => result(callback, err, res))
}

Website.findById = (id, callback) => {
    mysql.query(`SELECT * FROM websites WHERE website_id = ? `, [id], (err, res) => result(callback, err, res))
}

Website.update = (id, website, callback) => {
    mysql.query(`UPDATE websites SET website_url = ?, website_name = ? WHERE website_id = ?`,
        [website.website_url, website.website_name, id], (err, res) => result(callback, err, res))
}

Website.delete = (id, callback) => {
    mysql.query(`DELETE FROM websites WHERE website_id = ?`, [id], (err, res) => result(callback, err, res))
}

module.exports = Website