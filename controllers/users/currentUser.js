async function currentUser(req, res, next) {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
}
module.exports = currentUser;
