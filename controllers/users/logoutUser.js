const { User } = require("../../models/user");
async function logoutUser(req, res, next) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
}
module.exports = logoutUser;
