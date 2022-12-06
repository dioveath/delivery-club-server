const Joi = require('joi-oid');

const paymentUpdateSchema = Joi.object().keys({
  order_id: Joi.objectId(),
  status: Joi.string().valid('pending', 'complete', 'failed'),
  payment_method: Joi.string().valid('cash', 'card', 'coupon')
}).min(1);

const paymentSchema = paymentUpdateSchema.options({ presence: 'required'});

module.exports = {
  paymentSchema,
  paymentUpdateSchema
};
