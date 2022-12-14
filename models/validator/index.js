const Joi = require('joi');

function validator(schema){
  return (payload) => {
    const { error } = schema.validate(payload, {abortEarly: false, allowUnknown: true, stripUnknown: true});
  
    if(error){
      var message = error.details.map(el => el.message);
      return {
        errorList: message
      };
    }
    return true;
  };
}


module.exports = validator;
