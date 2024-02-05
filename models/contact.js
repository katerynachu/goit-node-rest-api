const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", (error, doc, next) => {
  if (error) {
    error.status = 400;
    console.error(error);
    next(error);
  } else {
    next();
  }
});

const Contact = model("contact", contactSchema);

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
});
const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact,
  updateStatusSchema,
  updateContactSchema,
  createContactSchema,
};
