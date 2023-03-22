const uuid = require('uuid')
const path = require('path');
const {Apartment, ApartmentInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class ApartmentController {
    async create(req, res, next) {
        try {
            let {name, price, roomId, typeId, info, houseId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const apartment = await Apartment.create({name, price, roomId, typeId, img: fileName, houseId});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ApartmentInfo.create({
                        title: i.title,
                        description: i.description,
                        apartmentId: apartment.id
                    })
                )
            }

            return res.json(apartment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {roomId, typeId, limit, page, houseId} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let apartments;
        if (!roomId && !typeId && !houseId) {
            apartments = await Apartment.findAndCountAll({limit, offset})
        }
        if (roomId && !typeId && !houseId) {
            apartments = await Apartment.findAndCountAll({where:{roomId}, limit, offset})
        }
        if (!roomId && typeId && !houseId) {
            apartments = await Apartment.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (roomId && typeId && !houseId) {
            apartments = await Apartment.findAndCountAll({where:{typeId, roomId}, limit, offset})
        }
        if (roomId && typeId && houseId) {
            apartments = await Apartment.findAndCountAll({where:{typeId, roomId, houseId}, limit, offset})
        }
        if (!roomId && typeId && houseId) {
            apartments = await Apartment.findAndCountAll({where:{typeId, houseId}, limit, offset})
        }
        if (roomId && !typeId && houseId) {
            apartments = await Apartment.findAndCountAll({where:{roomId, houseId}, limit, offset})
        }
        if (!roomId && !typeId && houseId) {
            apartments = await Apartment.findAndCountAll({where:{houseId}, limit, offset})
        }
        return res.json(apartments)
    }

    async getOne(req, res) {
        const {id} = req.params
        const apartment = await Apartment.findOne(
            {
                where: {id},
                include: [{model: ApartmentInfo, as: 'info'}]
            },
        )
        return res.json(apartment)
    }
}

module.exports = new ApartmentController()