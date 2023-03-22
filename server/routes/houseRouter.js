const Router = require('express')
const router = new Router()
const houseController = require('../controllers/houseController')

router.post('/', houseController.create)
router.get('/', houseController.getAll)

module.exports = router