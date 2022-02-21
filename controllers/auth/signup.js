const createError = require("http-errors");
const bcrypt = require("bcryptjs/dist/bcrypt");
const gravatar = require("gravatar");
const { User, schemas } = require("../../models/user");
const { v4 } = require("uuid");
const { sendMail } = require("../../service/");
async function signup(req, res, next) {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { email, password, subscribtion } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new createError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();
    const result = await User.create({
      email,
      avatarURL,
      password: hashPassword,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank" href='http://localhost:3000/api/users/${verificationToken}'>Press to confirm your email</a>`,
    };
    await sendMail(mail);
    res.status(201).json({ user: { email: email, subscribtion: "starter" } });
  } catch (error) {
    next(error);
  }
}

module.exports = signup;
