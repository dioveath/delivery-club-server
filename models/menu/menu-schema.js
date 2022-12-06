const Joi = require('joi-oid');

const menuUpdateSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(5).max(120),
  recipes: Joi.array().items(Joi.string())
}).min(1);

const menuSchema = menuUpdateSchema.options({ presence: 'required'});

module.exports = {
  menuSchema,
  menuUpdateSchema
};
