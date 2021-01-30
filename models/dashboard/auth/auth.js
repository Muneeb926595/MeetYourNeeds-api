const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

const { Schema } = mongoose;

const admin = new Schema(
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
  },

  {
    timestamps: true,
  }
);

admin.methods.getAuthToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
};

const Admin = mongoose.model("admin", admin);
const validateAdmin = (admin) => {
  const schema = {
    fullName: Joi.string().min(3).max(255).required(),
    userName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().min(2).max(255).required(),
    password: Joi.string().min(3).max(255),
  };
  return Joi.validate(admin, schema);
};
module.exports.Admin = Admin;
module.exports.validateAdmin = validateAdmin;
