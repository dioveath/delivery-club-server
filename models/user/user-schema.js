const Joi = require('joi-oid');


// user is the restaurant here
const userUpdateSchema = Joi.object().keys({
  name: Joi.string().min(3).max(120),
  password: Joi.string().pattern(/^[A-z0-9~!@#$%^&*()_+-=]{3,30}$/),  
  email: Joi.string().email(),
  address: Joi.string(),
  postcode: Joi.string(),
  phone_number: Joi.string().length(10).pattern(/^[0-9]+$/),
  whatwords: Joi.string(),
  profile_link: Joi.string().allow(''),
  orders: Joi.array(),
  zones: Joi.array()
}).min(1);

const userSchema = userUpdateSchema.options({ presence: 'required'});

module.exports = {
  userSchema,
  userUpdateSchema
};
