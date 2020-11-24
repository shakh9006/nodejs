const FtpModel    = require('../models/Ftp')
const Validator   = require('../validation');

const FtpController =  {
    result(res, err, ftp) {
        if (err) {
            res.status(400)
            res.send({success: false, body: [], message: err.message})
        } else {
            res.status(200)
            res.send({success: true, body: ftp, message: ''})
        }
    }
}

FtpController.create = (req, res) => {
    const ftp = new FtpModel(req.body)
    if ( !Validator.validate(res, 'createOrUpdateFtp', ftp)
        || !Validator.rowExists(res, 'servers', ftp.server_id)
        || !Validator.rowExists(res, 'websites', ftp.website_id) ) return

    FtpModel.create(ftp, (err, res_ftp) => FtpController.result(res, err, res_ftp))
}

FtpController.findById = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id) ) return
    FtpModel.findById(id, (err, ftp) => FtpController.result(res, err, ftp))
}

FtpController.findAll = (req, res) => {
    FtpModel.findAll((err, ftps) => FtpController.result(res, err, ftps))
}

FtpController.update = async (req, res) => {
    const id  = req.params.id
    const ftp = new FtpModel(req.body)
    Validator.rowExists(res, 'servers', ftp.server_id).then(data => {
        console.log('data: ', data)
    })
    return
    console.log('a: ', a)
    if ( !Validator.validate(res, 'createOrUpdateFtp', ftp) || Validator.checkId(res, id) || !a) {
        console.log('inner a: ')
        return
    }
    if ( ! await Validator.rowExists(res, 'websites', ftp.website_id) ) return;
    FtpModel.update(id, ftp, (err, res_ftp) => FtpController.result(res, err, res_ftp))
}

FtpController.delete = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    FtpModel.delete(id, (err, ftp) => FtpController.result(res, err, ftp))
}

module.exports = FtpController