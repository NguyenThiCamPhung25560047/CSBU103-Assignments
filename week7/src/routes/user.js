const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", userController.showLogin);
router.post("/login", userController.login);

router.get("/register", userController.showRegister);
router.post("/register", userController.register);

module.exports = router;
