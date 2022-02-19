const express = require("express");
const { authentication, upload } = require("../../middlewares");
const router = express.Router();
const {
  currentUser,
  updateAvatars,
  logoutUser,
  verificationToken,
  verify,
} = require("../../controllers/users");

router.get("/current", authentication, currentUser);
router.get("/logout", authentication, logoutUser);
router.patch(
  "/avatars",
  authentication,
  upload.single("avatar"),
  updateAvatars
);
router.get("/verify/:verificationToken", verificationToken);

router.post("/verify", verify);
module.exports = router;
