const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.showRegister = (req, res) => {
  res.render("register", { message: null });
};

exports.register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

  if (!emailRegex.test(email)) {
    return res.render("register", { message: "Invalid email format" });
  }

  if (password.length < 6 || !passRegex.test(password)) {
    return res.render("register", { message: "Password must be 6 chars, include number & special char" });
  }

  if (password !== confirmPassword) {
    return res.render("register", { message: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashedPassword
    });

    await newUser.save();
    res.render("register", { message: "Register success!" });

  } catch (err) {
    res.render("register", { message: "User already exists!" });
  }
};
