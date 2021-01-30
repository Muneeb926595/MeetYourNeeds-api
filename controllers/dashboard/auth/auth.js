const bycrypt = require("bcryptjs");

const { Admin, validateAdmin } = require("../../../models/dashboard/auth/auth");
const { User } = require("../../../models/auth/user");

//get all users
exports.getUsers = async (req, res, next) => {
  const user = await User.find();
  return res.status(200).send(user);
};

//login the admin if exist
exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({
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

//create new admin
exports.createAdmin = async (req, res, next) => {
  const { error } = validateAdmin(req.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }
  const { fullName, userName, email, password } = req.body;

  const checkUserName = await Admin.findOne({ userName: userName }).lean();
  const checkEmail = await Admin.findOne({ email: email }).lean();

  if (checkEmail) {
    return res.status("400").send("Email Already Exist");
  }
  if (checkUserName) {
    return res.status("400").send("User Name Already Exist");
  }

  const hashPass = await bycrypt.hash(password, 8);

  const client = new Admin({
    fullName,
    userName,
    email,
    password: hashPass,
  });

  const result = await client.save();
  const accessToken = client.getAuthToken();
  return res.status(200).send({ _id: result._id, accessToken });
};
