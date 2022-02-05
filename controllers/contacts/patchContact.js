const { Contact, schemas } = require("../../models/contacts.js");
const createError = require("http-errors");
async function patchContact(req, res, next) {
  try {
    const { error } = schemas.joinUpdateFav.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    if (!req.body) {
      res
        .json({
          message: "missing field favorite",
        })
        .status(400);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      res
        .json({
          message: "Not found",
        })
        .status(404);
    }
    res.json(result).status(200);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 400;
    }
    next(error);
  }
}
module.exports = patchContact;
