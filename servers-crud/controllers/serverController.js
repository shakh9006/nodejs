const Validator   = require('../validation');
const ServerModel = require('../models/Server')

const ServerController =  {
    result(res, err, server) {
        if (err) {
            res.status(400)
            res.send({success: false, body: [], message: err.message})
        } else {
            res.status(200)
            res.send({success: true, body: server, message: ''})
        }
    },
}

ServerController.create = (req, res) => {
    const server  = new ServerModel(req.body)
    if (!Validator.validate(res, 'createOrUpdateServer', server)) return
    ServerModel.create(server, (err, res_server) => ServerController.result(res, err, res_server))
}

ServerController.findById = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    ServerModel.findById(id, (err, server) => ServerController.result(res, err, server))
}

ServerController.findAll = (req, res) => {
    ServerModel.findAll((err, students) => ServerController.result(res, err, students))
}

ServerController.update = (req, res) => {
    const id     = req.params.id
    const server = new ServerModel(req.body)
    if (!Validator.validate(res, 'createOrUpdateServer', server) || Validator.checkId(res, id)) return
    ServerModel.update(id, server, (err, res_server) => ServerController.result(res, err, res_server))
}

ServerController.delete = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    ServerModel.delete(id, (err, server) => ServerController.result(res, err, server))
}

module.exports = ServerController