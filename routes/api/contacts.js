const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  postContact,
  putContact,
  patchContact,
  deleteContact,
} = require("../../controllers/contacts");
router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContact);

router.patch("/:contactId/favorite", patchContact);
module.exports = router;
