const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/order/order')

router.post('/order', orderController.addOrder)
router.get('/order', orderController.getOrders)
router.delete('/order/:id', orderController.removeOrderByAdmin)

module.exports = router
