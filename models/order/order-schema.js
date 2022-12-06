const Joi = require('joi-oid');

const orderUpdateSchema = Joi.object().keys({
  status: Joi.string().valid('pending', 'confirmed', 'updating', 'onway', 'complete'),
  ordered_by: Joi.objectId(),
  delivered_by: Joi.objectId(),
  recipes: Joi.array().items(Joi.string()),
  total_amount: Joi.number(),
  location: Joi.string().min(3).max(120),
  postcode: Joi.string().min(2).max(20)
}).min(1);

const orderSchema = orderUpdateSchema.options({ presence: 'required'});

module.exports = {
  orderSchema,
  orderUpdateSchema
};
