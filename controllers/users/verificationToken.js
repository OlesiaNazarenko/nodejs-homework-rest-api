const { User } = require("../../models/user");
const createError = require("http-errors");
async function verificationToken(req, res, next) {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne(verificationToken);
    if (!user) {
      throw createError(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id),
      { verify: true, verificationToken: "" };
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}
module.exports = verificationToken;
