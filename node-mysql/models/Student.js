const mysql  = require('../database/db')
const config = require('../config')

const result = (callback, err, res) => {
    if ( err ) {
        callback(err, null)
    } else {
        callback(null, res)
    }
}

const Student = function (student) {
    this.email       = student.email
    this.phone       = student.phone
    this.status      = student.status
    this.last_name   = student.last_name
    this.first_name  = student.first_name
    this.created_at  = new Date()
    this.updated_at  = new Date()
}

Student.create = (student, callback) => {
    mysql.query(`INSERT INTO ${config.dbname}.students set ?`, student,  (err, res) => result(callback, err, res))
}

Student.findById = (id, callback) => {
    mysql.query(`SELECT * FROM ${config.dbname}.students WHERE id = ? `, id, (err, res) => result(callback, err, res))
}

Student.findAll = (callback) => {
    mysql.query(`SELECT * FROM ${config.dbname}.students`, (err, res) => result(callback, err, res))
}

Student.update = (id, student, callback) => {
    mysql.query(`UPDATE ${config.dbname}.students SET first_name = ?, last_name = ?, email = ?, phone = ?, status = ? WHERE id = ?`,
        [student.first_name, student.last_name, student.email, student.phone, student.status, id], (err, res) => result(callback, err, res))
}

Student.delete = (id, callback) => {
    mysql.query(`DELETE FROM ${config.dbname}.students WHERE id = ?`, [id], (err, res) => result(callback, err, res))
}


module.exports = Student