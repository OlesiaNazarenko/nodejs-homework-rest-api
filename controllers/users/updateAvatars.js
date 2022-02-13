const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/user");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
async function updateAvatars(req, res, next) {
  const { _id } = req.user;
  const { path: tmpUpload, filename } = req.file;
  try {
    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    Jimp.read(resultUpload)
      .then((file) => {
        return file.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
}
module.exports = updateAvatars;
