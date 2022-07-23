const express = require('express')
const Router = express.Router()
const authenticate = require('../middlewares/authenticate')
const paymentController = require('../controllers/paymentController')



Router.post('/pay', authenticate, paymentController.placePayment

)


module.exports = Router
