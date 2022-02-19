const express = require("express");
const router = express.Router();
const { signup, login } = require("../../controllers/auth");

router.post("/signup", signup);
router.post("/users/login", login);

module.exports = router;
