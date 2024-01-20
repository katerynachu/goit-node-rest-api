const express = require('express');
const contactsRouter = express.Router();

const functions = require('../controllers/contactsControllers.js')


contactsRouter.get("/", functions.getAllContacts);

contactsRouter.get("/:id", functions.getOneContact);

contactsRouter.delete("/:id", functions.deleteContact);

contactsRouter.post("/", functions.createContact);

contactsRouter.put("/:id", functions.updateContact);

module.exports = contactsRouter;