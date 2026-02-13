const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.showRegister);
router.post("/register", userController.register);

module.exports = router;
