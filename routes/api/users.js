const express = require("express");
const Jimp = require("jimp");
const { authentication, upload } = require("../../middlewares");
const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
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

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
router.patch(
  "/avatars",
  authentication,
  upload.single("avatar"),
  async (req, res, next) => {
    const { _id } = req.user;
    const { path: tmpUpload, filename, destination } = req.file;

    console.log(req.file.path);
    console.log(tmpUpload);
    try {
      const [extention] = filename.split(".").reverse();
      const newFileName = `${_id}.${extention}`;
      const resultUpload = path.join(avatarsDir, newFileName);
      await fs.rename(tmpUpload, resultUpload);
      const avatarURL = path.join("avatars", newFileName);
      await User.findByIdAndUpdate(_id, { avatarURL });
      // await Jimp.read(path).then((file) =>
      //   file.resize(250, 250).write(`${destination}/${newFileName}`)
      // );
      res.status(200).json({ avatarURL });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
