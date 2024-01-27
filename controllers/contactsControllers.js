const { Contact } = require("../models/contact");

async function listContacts(req, res) {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getContactById(req, res) {
  const contactId = req.params.id;

  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function addContact(req, res) {
  const { name, email, phone } = req.body;
  try {
    const newContact = await Contact.create({ name, email, phone });
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function removeContact(req, res) {
  const contactId = req.params.id;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json("Contact was deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateContact(req, res) {
  const contactId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updatedData,
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateStatus(req, res) {
  const contactId = req.params.id;
  const { favorite } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  updateStatus,
  updateContact,
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
