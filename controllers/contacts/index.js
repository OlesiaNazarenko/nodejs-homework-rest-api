const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const postContact = require("./postContact");
const putContact = require("./putContact");
const patchContact = require("./patchContact");
const deleteContact = require("./deleteContact");

module.exports = {
  getContacts,
  getContactById,
  postContact,
  putContact,
  patchContact,
  deleteContact,
};
