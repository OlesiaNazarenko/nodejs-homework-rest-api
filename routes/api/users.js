const express = require("express");
const { authentication, upload } = require("../../middlewares");
const router = express.Router();
const {
  currentUser,
  updateAvatars,
  logoutUser,
} = require("../../controllers/users");

router.get("/current", authentication, currentUser);
router.get("/logout", authentication, logoutUser);
router.patch(
  "/avatars",
  authentication,
  upload.single("avatar"),
  updateAvatars
);

module.exports = router;
