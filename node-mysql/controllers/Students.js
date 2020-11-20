const mysql  = require('../database/db')
const config = require('../config')

const result = (res, err, sql_res) => {
    console.log('query: ', sql_res)
    if ( err ) {
        res.status(400)
            .send({
                success: false,
                message: err.message
            })
    } else {
        res.status(200)
        res.send({
            success: true,
            body: sql_res
        })
    }
}

const Students = function (student) {
    this.email       = student.email
    this.phone       = student.phone
    this.status      = student.status
    this.last_name   = student.last_name
    this.first_name  = student.first_name
    this.created_at  = new Date()
    this.updated_at  = new Date()
}

Students.create = (req, res, next) => {
    const student = new Students(req.body)
    mysql.query(`INSERT INTO ${config.dbname}.students set ?`, student,  (err, sql_res) => result(res, err, sql_res))
}

Students.findById = (req, res, next) => {
    mysql.query(`SELECT * FROM ${config.dbname}.students WHERE id = ? `, req.params.id, (err, sql_res) => result(res, err, sql_res))
}

Students.findAll = (req, res, next) => {
    mysql.query(`SELECT * FROM ${config.dbname}.students`, (err, sql_res) => result(res, err, sql_res))
}

Students.update = (req, res, next) => {
    const student = req.body
    mysql.query(`UPDATE ${config.dbname}.students SET first_name = ?, last_name = ?, email = ?, phone = ?, status = ? WHERE id = ?`,
        [student.first_name, student.last_name, student.email, student.phone, student.status, req.params.id],
        (err, sql_res) => result(res, err, sql_res))
}

Students.delete = (req, res, next) => {
    mysql.query(`DELETE FROM ${config.dbname}.students WHERE id = ?`, [req.params.id], (err, sql_res) => result(res, err, sql_res))
}


module.exports = Students