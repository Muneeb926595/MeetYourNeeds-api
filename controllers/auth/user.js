const bycrypt = require("bcryptjs");
const mongoose = require("mongoose");

const { User, validateUser } = require("../../models/auth/user");

//get all users
exports.getUsers = async (req, res, next) => {
  const user = await User.find();
  return res.status(200).send(user);
};

//get user by user_id
exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  return res.status(200).send(user);
};
//login the user if exist
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: email }, { userName: email }],
  });
  if (!user) {
    return res.status(400).send("Email not found");
  }

  const isUserCorrect = await bycrypt.compare(password, user.password);

  if (!isUserCorrect) {
    return res.status(400).send("Password is invalid!");
  }
  const accessToken = user.getAuthToken();

  return res.status(200).send({ _id: user._id, accessToken });
};

//update user password
exports.updatePassword = async (req, res, next) => {
  const { newPassword } = req.body;

  const client = {
    password: newPassword,
  };

  //try to get user id some how either send it from front end or do smething on backend
  // const updatedUser = await User.findByIdAndUpdate(user._id, client);
  // return res.status(200).send(updatedUser);
};
//create new user
exports.createUser = async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }
  const { fullName, userName, email, password } = req.body;

  const checkUserName = await User.findOne({ userName: userName }).lean();
  const checkEmail = await User.findOne({ email: email }).lean();

  if (checkEmail) {
    return res.status("400").send("Email Already Exist");
  }
  if (checkUserName) {
    return res.status("400").send("User Name Already Exist");
  }

  const hashPass = await bycrypt.hash(password, 8);

  const client = new User({
    fullName,
    userName,
    email,
    password: hashPass,
  });

  const result = await client.save();
  const accessToken = client.getAuthToken();
  return res.status(200).send({ _id: result._id, accessToken });
};

exports.addToCart = async (req, res, next) => {
  const { userId, productId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status("400").send("User Not Found");
  }

  if (user.cart) {
    const currentCartItems = user.cart;

    let newCart = [];
    if (currentCartItems.length > 0) {
      newCart = [...currentCartItems, productId];
    } else {
      newCart.push(productId);
    }

    const client = {
      cart: newCart,
    };

    const newUser = await User.findByIdAndUpdate(userId, client);

    return res.status(200).send(newUser);
  } else {
    let newCart = [];
    newCart.push(productId);

    const client = {
      cart: newCart,
    };

    const newUser = await User.findByIdAndUpdate(userId, client);

    return res.status(200).send(newUser);
  }
};

exports.addToCart = async (req, res, next) => {
  const { userId, productId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status("400").send("User Not Found");
  }

  if (user.cart) {
    const currentCartItems = user.cart;

    let newCart = [];
    if (currentCartItems.length > 0) {
      newCart = [...currentCartItems, productId];
    } else {
      newCart.push(productId);
    }

    const client = {
      cart: newCart,
    };

    const newUser = await User.findByIdAndUpdate(userId, client);

    return res.status(200).send(newUser);
  } else {
    let newCart = [];
    newCart.push(productId);

    const client = {
      cart: newCart,
    };

    const newUser = await User.findByIdAndUpdate(userId, client);

    return res.status(200).send(newUser);
  }
};

exports.getUserCart = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return res.status("400").send("User Not Found");
  }

  const userCart = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "products",
        localField: "cart",
        foreignField: "_id",
        as: "cart",
      },
    },
    { $project: { cart: 1, _id: 0 } },
    { $unwind: "$cart" },
  ]);

  return res.status("200").send(userCart);
};
exports.removeFromCart = async (req, res, next) => {
  const { userId, productId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return res.status("400").send("User Not Found");
  }

  if (user.cart && user.cart.length > 0) {
    const newCart = user.cart.filter(
      (singleProduct) => singleProduct._id.toString() !== productId.toString()
    );
    const client = {
      cart: newCart,
    };

    const newUserCart = await User.findByIdAndUpdate(userId, client);
    return res.status("200").send(newUserCart);
  }
};
