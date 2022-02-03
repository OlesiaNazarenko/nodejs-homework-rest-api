const { Schema, model } = require("mongoose");
const Joi = require("joi");
const createError = require("http-errors");
const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const joiValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas: {
    joiValidation: joiValidationSchema,
    joinUpdateFav: joiUpdateFavoriteSchema,
  },
};
