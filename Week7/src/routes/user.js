const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

    if (!emailRegex.test(email))
        return res.send("Invalid email format");

    if (!passwordRegex.test(password))
        return res.send("Password rule not satisfied");

    if (password !== confirmPassword)
        return res.send("Passwords do not match");

    const exist = await User.findOne({ email });
    if (exist)
        return res.send("Email already exists");

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
        email: email,
        password: hashed
    });

    res.send("Register success");
});

module.exports = router;
