const { Contact } = require("../../models/contacts.js");
const createError = require("http-errors");
async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error);
  }
}
module.exports = getContactById;
