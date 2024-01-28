const { Contact } = require("../models/contact");
const {HttpError} = require("../helpers/HttpError")
async function listContacts(req, res) {
  const contacts = await Contact.find();
  res.json(contacts);
}

async function getContactById(req, res) {
  const contactId = req.params.id;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError('404',"Contact not found")
  }
    res.json(result);
 
}
async function addContact(req, res) {
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({ name, email, phone });
  res.json(newContact);
}

async function removeContact(req, res) {
  const contactId = req.params.id;

  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw HttpError('404',"Contact not found")
  }
  res.json("Contact was deleted");
}

async function updateContact(req, res) {
  const contactId = req.params.id;
  const updatedData = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    updatedData,
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError('404',"Contact not found")
  }
  res.json(updatedContact);
}

async function updateStatus(req, res) {
  const contactId = req.params.id;
  const { favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError('404',"Contact not found")
  }
  res.json(updatedContact);
}

module.exports = {
  updateStatus,
  updateContact,
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
