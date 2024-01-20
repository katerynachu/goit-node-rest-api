const fs = require ("fs/promises");
const path = require("path");
const {nanoid} = require('nanoid')
const contactsPath = path.resolve("./db/contacts.json");


async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
  
 async function getContactById(contactId) {
    try {
      const contacts = await listContacts();
      return contacts.find(contact => contact.id === contactId);
    } catch (error) {
      throw error;
    }
  }
  
  async function addContact({name,email,phone}) {
    try {
      const contacts = await listContacts();
      const newContact = {
        id:nanoid(),
        name,
        email,
        phone
      }
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
      throw error;
    }
  }
  
async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    } catch (error) {
      throw error;
    }
  }
  async function updateContact(contactId, updatedData) {
    try {
      console.log("Updating contact with ID:", contactId);
      
      const contacts = await listContacts();
      const index = contacts.findIndex((contact) => contact.id === contactId);

      if (index === -1) {
          console.log("Contact not found");
          return null;
      }

      const updatedContact = { ...contacts[index], ...updatedData };
      contacts[index] = updatedContact;

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      console.log("Contact updated:", updatedContact);

      return updatedContact;
  } catch (error) {
      console.error("Error updating contact:", error);
      throw error; 
  }
  }
  module.exports ={
    updateContact,
    listContacts,
    addContact,
    getContactById,
    removeContact
  }