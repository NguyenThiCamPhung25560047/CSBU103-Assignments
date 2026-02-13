const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.showRegister = (req, res) => {
  res.render("register");
};

exports.showLogin = (req, res) => {
  res.render("login");
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await User.create({ email, password: hash });
  res.send("Register success");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Wrong password");

  res.send("Login success");
};
