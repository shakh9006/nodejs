const Validator        = require('../validation');
const AdminAccessModel = require('../models/AdminAccess')

const AdminAccessController =  {
    result(res, err, admin_access) {
        if (err) {
            res.status(400)
            res.send({success: false, body: [], message: err.message})
        } else {
            res.status(200)
            res.send({success: true, body: admin_access, message: ''})
        }
    }
}

AdminAccessController.create = (req, res) => {
    const admin_access = new AdminAccessModel(req.body)
    if (!Validator.validate(res, 'createOrUpdateAdminAccess', admin_access)) return
    AdminAccessModel.create(admin_access, (err, res_admin_access) => AdminAccessController.result(res, err, res_admin_access))
}

AdminAccessController.findById = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    AdminAccessModel.findById(id, (err, admin_access) => AdminAccessController.result(res, err, admin_access))
}

AdminAccessController.findAll = (req, res) => {
    AdminAccessModel.findAll((err, students) => AdminAccessController.result(res, err, students))
}

AdminAccessController.update = (req, res) => {
    const id           = req.params.id
    const admin_access = new AdminAccessModel(req.body)
    if (!Validator.validate(res, 'createOrUpdateAdminAccess', admin_access) || Validator.checkId(res, id)) return
    AdminAccessModel.update(id, admin_access, (err, res_admin_access) => AdminAccessController.result(res, err, res_admin_access))
}

AdminAccessController.delete = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    AdminAccessModel.delete(id, (err, admin_access) => AdminAccessController.result(res, err, admin_access))
}

module.exports = AdminAccessController