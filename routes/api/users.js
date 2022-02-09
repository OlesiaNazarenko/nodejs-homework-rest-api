const express = require("express");
const { authentication } = require("../../middlewares");
const { User } = require("../../models/user");
const router = express.Router();
router.get("/current", authentication, async (req, res, next) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
});
router.get("/logout", authentication, async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
});
module.exports = router;
