const router = require('express').Router()
const thoughtRoutes = require('./thought-routes')
const userRouter = require('./user-routes')

router.use('/thoughts', thoughtRoutes)
router.use('/users', userRouter)


module.exports = router