const Joi = require('joi-oid');


// user is the restaurant here
const userUpdateSchema = Joi.object().keys({
  name: Joi.string().min(3).max(120),
  password: Joi.string().pattern(/^[A-z0-9~!@#$%^&*()_+-=]{3,30}$/),  
  email: Joi.string().email(),
  address: Joi.string(),
  postcode: Joi.string(),
  phone_number: Joi.string().length(10).pattern(/^[0-9]+$/),
  // est_date: Joi.date().min('1-1-1970').max('1-1-2020'), MM-DD-YYYY
  // roles: Joi.array().items(Joi.objectId()),
  // permissions: Joi.array().items(Joi.string()),
  profile_link: Joi.string().allow(''),
  orders: Joi.array()
}).min(1);

const userSchema = userUpdateSchema.options({ presence: 'required'});

module.exports = {
  userSchema,
  userUpdateSchema
};
