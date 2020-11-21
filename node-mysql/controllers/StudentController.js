const StudentModel = require('../models/Student')

const StudentController = {
    result(res, err, student) {
        if ( err ) {
            res.status(400)
            res.send({
                success: false,
                message: err.message
            })
        } else {
            res.status(200)
            res.send({
                success: true,
                message: student
            })
        }
    },

    findAll(req, res) {
        StudentModel.findAll((err, student) => StudentController.result(res, err, student))
    },

    create(req, res) {
        const student = new StudentModel(req.body)
        StudentModel.create(student, (err, student) => StudentController.result(res, err, student))
    },

    findById(req, res) {
        StudentModel.findById(req.params.id, (err, student) => StudentController.result(res, err, student))
    },

    update(req, res) {
        const student = new StudentModel(req.body)
        StudentModel.update(req.params.id, student, (err, student) => StudentController.result(res, err, student))
    },

    delete(req, res) {
        StudentModel.delete(req.params.id, (err, student) => StudentController.result(res, err, student))
    }
}

module.exports = StudentController