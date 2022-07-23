const express = require('express')
const orderController = require('../controllers/orderController')
const Router = express.Router()
const { body } = require('express-validator');
const authenticate = require('../middlewares/authenticate')
const { AdminMiddleware } = require('../middlewares/commonMiddleware')
/*
@usage : Place an Order
@url : /api/orders/
@access : PRIVATE
*/

Router.post('/', authenticate,
    body("items").notEmpty().withMessage("Items Required !"),
    body("total").notEmpty().withMessage("total Required !"),
    body("tax").notEmpty().withMessage("tax Required !")

    , orderController.placeAnOrder)
/*
    @usage : Get All Orders
    @url : /api/orders/all
    @access : PRIVATE
 */


Router.get('/all', authenticate, orderController.getAllOrders)
/*
    @usage : delete one Orders
    @url : /api/orders/:id
    @access : PRIVATE , admin
 */

Router.delete('/:id', authenticate, AdminMiddleware, orderController.deleteOneOrder)

module.exports = Router