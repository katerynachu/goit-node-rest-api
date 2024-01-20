const contactsService = require("../services/contactsServices.js");
const handleError = require('../helpers/HttpError.js')
const shema = require('../shemas/contactsShemas.js')
 const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactsService.listContacts();
        return res.json({
          status: "success",
          code: 200,
          data: contacts,
        });
      } catch (error) {
        return handleError(res, error);
      }
};

const getOneContact = async(req, res) => {
    try {
        const { id } = req.params;
        const contact = await contactsService.getContactById(id);
    
        if (!contact) {
          return res.status(404).json({
            status: "error",
            code: 404,
            message: "Contact not found",
          });
        }
    
        return res.json({
          status: "success",
          code: 200,
          data: contact,
        });
      } catch (error) {
        return handleError(res, error);
      }
};

const deleteContact = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await contactsService.removeContact(id);
    
        if (!deletedContact) {
          return res.status(404).json({
            status: "error",
            code: 404,
            message: "Contact not found",
          });
        }
    
        return res.json({
          status: "success",
          code: 200,
          data: deletedContact,
        });
      } catch (error) {
        return handleError(res, error);

      }
};

 const createContact = async(req, res) => {
    try {
        const { name, email, phone } = req.body;
        const schema = shema.createContactSchema;
    
        const validationResult = schema.validate({ name, email, phone });
    
        if (validationResult.error) {
          throw new HttpError(400, validationResult.error.message);
        }
    
        const newContact = await contactsService.addContact({ name, email, phone });
    
        return res.status(201).json({
          status: "success",
          code: 201,
          data: newContact,
        });
      } catch (error) {
        return handleError(res, error);

      }
 };

 const updateContact = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
  
      console.log("Updating contact with ID:", id);
  
      const schema = shema.updateContactSchema;
      const validationResult = schema.validate({ name, email, phone });
  
      if (validationResult.error) {
        throw new HttpError(400, validationResult.error.message);
      }
  
      if (!name && !email && !phone) {
        throw new HttpError(400, "Body must have at least one field");
      }
  
      const existingContact = await contactsService.getContactById(id);
  
      if (!existingContact) {
        throw new HttpError(404, "Contact not found");
      }
  
      const updatedData = {
        name: name || existingContact.name,
        email: email || existingContact.email,
        phone: phone || existingContact.phone,
      };
  
      const updatedContact = await contactsService.updateContact(id, updatedData);
  
      return res.json({
        status: "success",
        code: 200,
        data: updatedContact,
      });
    } catch (error) {
      return handleError(res, error);
    }
 };

 module.exports = {
    updateContact,
    createContact,
    deleteContact,
    getOneContact,
    getAllContacts

 }