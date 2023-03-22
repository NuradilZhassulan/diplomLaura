const Router = require('express')
const router = new Router()
const apartmentController = require('../controllers/apartmentController')

router.post('/', apartmentController.create)
router.get('/', apartmentController.getAll)
router.get('/:id', apartmentController.getOne)

module.exports = router