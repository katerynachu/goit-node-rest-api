const { User } = require("../models/user");
const HttpError = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const jimp = require("jimp");
const fs = require("fs/promises");



const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError("409", "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "200", d: "retro" }, true);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
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
    throw new HttpError('401', "Not authorized");
  }

  res.status(200).json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
}

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  try {
    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, filename);

    await jimp.read(tempUpload).then(image => {
      return image.resize(250, 250).write(resultUpload);
    });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserAvatar,
};
