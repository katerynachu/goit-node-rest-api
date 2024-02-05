const express = require("express");
const controllerWrapp = require("../helpers/ContollerWrapp.js");
const contactsRouter = express.Router();
const validateBody = require("../helpers/validateBody.js");
const {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../models/contact.js");
const {
  updateContact,
  updateStatus,
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("../controllers/contactsControllers.js");

contactsRouter.get("/", controllerWrapp(listContacts));

contactsRouter.get("/:id", controllerWrapp(getContactById));

contactsRouter.delete("/:id", controllerWrapp(removeContact));

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  controllerWrapp(addContact)
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  controllerWrapp(updateContact)
);

contactsRouter.put(
  "/:id/favorite",
  validateBody(updateStatusSchema),
  controllerWrapp(updateStatus)
);

module.exports = contactsRouter;
