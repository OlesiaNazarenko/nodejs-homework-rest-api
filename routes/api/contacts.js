const express = require("express");
const router = express.Router();
const { authentication } = require("../../middlewares");
const {
  getContacts,
  getContactById,
  postContact,
  putContact,
  patchContact,
  deleteContact,
} = require("../../controllers/contacts");
router.get("/", authentication, getContacts);

router.get("/:contactId", getContactById);

router.post("/", authentication, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContact);

router.patch("/:contactId/favorite", patchContact);
module.exports = router;
