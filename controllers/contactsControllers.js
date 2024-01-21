const contactsService = require("../services/contactsServices.js");
const createError = require("../helpers/HttpError.js");
const controllerWrapp = require('../helpers/ContollerWrapp')

const getAllContactsFn = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getOneContactFn = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw createError(404, "Contact not found");
  }
  res.json(contact);
};

const deleteContactFn = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsService.removeContact(id);

  if (!deletedContact) {
    throw createError(404, "Contact not found");
  }

  res.json(deletedContact);
};

const createContactFn = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await contactsService.addContact({ name, email, phone });

  res.status(201).json(newContact);
};

const updateContactFn = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    throw HttpError(400, "Body must have at least one field");
  }

  const existingContact = await contactsService.getContactById(id);

  if (!existingContact) {
    throw HttpError(404, "Contact not found");
  }

  const updatedData = {
    name: name || existingContact.name,
    email: email || existingContact.email,
    phone: phone || existingContact.phone,
  };

  const updatedContact = await contactsService.updateContact(id, updatedData);

  res.json(updatedContact);
};
const  updateContact = controllerWrapp(updateContactFn);
const  createContact = controllerWrapp(createContactFn);
const  deleteContact = controllerWrapp(deleteContactFn);
const  getOneContact = controllerWrapp(getOneContactFn);
const  getAllContacts = controllerWrapp(getAllContactsFn);


module.exports = {
  updateContact,
  createContact,
  deleteContact,
  getOneContact,
  getAllContacts,
};
