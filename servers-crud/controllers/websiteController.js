const Validator    = require('../validation');
const WebsiteModel = require('../models/Website')

const WebsiteController =  {
    result(res, err, website) {
        if (err) {
            res.status(400)
            res.send({success: false, body: [], message: err.message})
        } else {
            res.status(200)
            res.send({success: true, body: website, message: ''})
        }
    }
}

WebsiteController.create = (req, res) => {
    const website = new WebsiteModel(req.body)
    if (!Validator.validate(res, 'createOrUpdateWebsite', website)) return
    WebsiteModel.create(website, (err, website) => WebsiteController.result(res, err, website))
}

WebsiteController.findById = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    WebsiteModel.findById(id, (err, website) => WebsiteController.result(res, err, website))
}

WebsiteController.findAll = (req, res) => {
    WebsiteModel.findAll((err, students) => WebsiteController.result(res, err, students))
}

WebsiteController.update = (req, res) => {
    const id     = req.params.id
    const website = new WebsiteModel(req.body)
    if (!Validator.validate(res, 'createOrUpdateWebsite', website) || Validator.checkId(res, id)) return
    WebsiteModel.update(id, website, (err, res_website) => WebsiteController.result(res, err, res_website))
}

WebsiteController.delete = (req, res) => {
    const id = req.params.id
    if (Validator.checkId(res, id)) return
    WebsiteModel.delete(id, (err, website) => WebsiteController.result(res, err, website))
}

module.exports = WebsiteController