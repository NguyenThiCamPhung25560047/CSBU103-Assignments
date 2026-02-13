const User = require("../models/User");
const bcrypt = require("bcrypt");

// show register page
exports.showRegister = (req, res) => {
  res.render("register", { message: null });
};

// handle register
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email: email,
    password: hashedPassword
  });

  res.render("register", { message: "Register success!" });
};

// show login page
exports.showLogin = (req, res) => {
  res.render("login", { message: null });
};

// handle login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login", { message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render("login", { message: "Wrong password" });
  }

  res.render("login", { message: "Login success!" });
};
