const mongoose = require('mongoose')
const Joi = require('joi')

const { Schema } = mongoose

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
    products: [{ type: mongoose.Schema.ObjectId, ref: 'product' }],
    paymentMethod: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
)
const Order = mongoose.model('order', orderSchema)

module.exports.Order = Order
