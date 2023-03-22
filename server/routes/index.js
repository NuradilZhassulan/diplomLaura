const Router = require('express')
const router = new Router()
const apartmentRouter = require('./apartmentRouter')
const userRouter = require('./userRouter')
const roomRouter = require('./roomRouter')
const houseRouter = require('./houseRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/room', roomRouter)
router.use('/apartment', apartmentRouter)
router.use('/house', houseRouter)

module.exports = router