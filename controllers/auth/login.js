const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const bcrypt = require("bcryptjs/dist/bcrypt");
const createError = require("http-errors");
const { User, schemas } = require("../../models/user");

async function login(req, res, next) {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new createError(401, "Email not found");
    }
    if (!user.verify) {
      throw new createError(401, "Email is not verified");
    }
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      throw new createError(401, "Password or email is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: { email: email, subscribtion: "starter" },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = login;
