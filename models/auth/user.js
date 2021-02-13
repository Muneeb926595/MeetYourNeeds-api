const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

const { Schema } = mongoose;

const user = new Schema(
  {
    fullName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "product",
      },
    ],
  },

  {
    timestamps: true,
  }
);

user.methods.getAuthToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("user", user);
const validateUser = (user) => {
  const schema = {
    fullName: Joi.string().min(3).max(255).required(),
    userName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().min(2).max(255).required(),
    password: Joi.string().min(3).max(255),
  };
  return Joi.validate(user, schema);
};
module.exports.User = User;
module.exports.validateUser = validateUser;
