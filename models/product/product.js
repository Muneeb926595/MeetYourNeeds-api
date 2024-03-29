const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", productSchema);

module.exports.Product = Product;
