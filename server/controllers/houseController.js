const {House} = require('../models/models')

class HouseController {
    async create(req, res) {
        const {name} = req.body
        const house = await House.create({name})
        return res.json(house)
    }

    async getAll(req, res) {
        const house = await House.findAll()
        return res.json(house)
    }

}

module.exports = new HouseController()