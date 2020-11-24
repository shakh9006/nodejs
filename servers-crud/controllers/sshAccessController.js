const Validator      = require('../validation');
const SshAccessModel = require('../models/SshAccess')

const SshAccessController =  {
    result(res, err, ssh_access) {
        if (err) {
            res.status(400)
            res.send({success: false, body: [], message: err.message})
        } else {
            res.status(200)
            res.send({success: true, body: ssh_access, message: ''})
        }
    }
}

SshAccessController.create = (req, res) => {
    const ssh_access = new SshAccessModel(req.body)
    if (!Validator.validate(res, 'createOrUpdateSsh', ssh_access)) return
    SshAccessModel.create(ssh_access, (err, res_ssh_access) => SshAccessController.result(res, err, res_ssh_access))
}

SshAccessController.findById = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    SshAccessModel.findById(id, (err, ssh_access) => SshAccessController.result(res, err, ssh_access))
}

SshAccessController.findAll = (req, res) => {
    SshAccessModel.findAll((err, students) => SshAccessController.result(res, err, students))
}

SshAccessController.update = (req, res) => {
    const id         = req.params.id
    const ssh_access = new SshAccessModel(req.body)
    if (!Validator.validate(res, 'createOrUpdateSsh', ssh_access) || Validator.checkId(res, id)) return
    SshAccessModel.update(id, ssh_access, (err, res_ssh_access) => SshAccessController.result(res, err, res_ssh_access))
}

SshAccessController.delete = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    SshAccessModel.delete(id, (err, ssh_access) => SshAccessController.result(res, err, ssh_access))
}

module.exports = SshAccessController