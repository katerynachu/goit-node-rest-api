const { User } = require("../models/user");
const { HttpError } = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError('409', "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const loginUser = async(req, res)=> {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError('401', "Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw HttpError('401', "Email or password is wrong");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  user.token = token;
  await user.save();

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
}

const logoutUser = async(req, res)=> {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw HttpError('401', "Not authorized");
  }

  user.token = null;
  await user.save();

  res.status(204).end();
}
const getCurrentUser= async(req, res) =>{
  const currentUser = req.user;

  if (!currentUser) {
    throw HttpError('401', "Not authorized");
  }

  res.status(200).json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
