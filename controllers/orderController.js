const Order = require('../models/Order')
const Product = require('../models/productModel')
const User = require('../models/User')
const { validationResult } = require('express-validator');


/*
@usage : Place an Order
@url : /api/orders/
@fields : items, qty, total, tax
@method : POST
@access : PRIVATE
*/

const placeAnOrder = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }

    try {

        const user = req.user.id
        const { items, total, tax } = req.body

        let order = new Order({
            user: user,
            items: items,
            total: total,
            tax: tax,
        })
        order = await order.save()
        // let orderId = order._id
        // let neworder = await Order.findById(orderId).populate("user")
        // console.log(neworder)
        res.status(200).json({
            msg: 'Order is Placed',
            order: order
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ errors: [{ msg: error.message }] })
    }

}

/*
    @usage : Get All Orders
    @url : /api/orders/all
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */

const getAllOrders = async (req, res, next) => {
    try {

        // const userDetails = await User.findById(req.user.id)
        // console.log(userDetails.isAdmin)
        const orders = await Order.find({ user: req.user.id })
        if (!orders) res.status(404).json({ errors: [{ msg: "Product doesn't exists  ! " }] })
        res.status(200).json(orders)
    } catch (error) {
        console.error(error)
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

/*
    @usage : delete one Orders
    @url : /api/orders/:id
    @fields : no-fields
    @method : delete
    @access : PRIVATE , admin
*/

const deleteOneOrder = async (req, res, next) => {
    const OrderId = req.params.id

    try {

        const OrderDeleted = await Order.findByIdAndDelete(OrderId)
        if (!OrderDeleted) res.status(404).json({ errors: [{ msg: 'Order does not exist !' }] })
        res.status(200).json(OrderDeleted)
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}




module.exports = {
    placeAnOrder: placeAnOrder,
    getAllOrders: getAllOrders,
    deleteOneOrder: deleteOneOrder
}

