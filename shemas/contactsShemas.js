const Joi = require("joi");

 const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
})

const updateContactSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional()
})

module.exports = {
    updateContactSchema,
    createContactSchema
}