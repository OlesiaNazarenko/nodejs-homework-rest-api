const { Contact, schemas } = require("../../models/contacts.js");

const createError = require("http-errors");
async function postContact(req, res, next) {
  try {
    const { error } = schemas.joiValidation.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const data = { ...req.body, owner: req.user._id };
    const result = await Contact.create(data);
    res.status(201).json(result);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
}
module.exports = postContact;
