// throws appropriate business frontend error for mongoose error and mongoose-unique-validator errors
const logger = require('./../lib/logger');

module.exports = (error) => {
  if (error.name == "ValidationError") {
    // from mongoose-unique-validator

    let props = Object.keys(error.errors);
    let messages = [];

    for (let prop of props) {
      // error.errors.message gives us: Error, 'gaming_name' to be unique
      // gets the errors.message exact message removing Error, from it
      let message = `${error.errors[`${prop}`].message}`
        .split(",")[1]
        .substring(1);
      messages.push(message.charAt(0).toUpperCase() + message.slice(1));
    }
    
    logger.error(messages.join(","));
    throw new Error(messages.join(","));
  } else if (error.name == "CastError") {

    const message = `Casting error with ${error.path} of value type '${error.valueType}' to type of '${error.kind}'`;
    logger.error(message);
    throw new Error(message);

  } else if (error.code === 11000) {
    // duplicates in db:
    // NOTE: this will never be reached, above unique validation will catch first, here is for reference only
    let props = Object.keys(error.keyValue);
    let messages = [];

    for (let prop of props) {
      messages.push(
        `"'${prop}' : '${error.keyValue[`${prop}`]}'" is already in use`
      );
    }

    logger.error(messages.join(","));    
    throw new Error(messages.join(","));
  } else if (error.code == 11011 || error.name == "CastError") {
    const message = `Resource not found with "id : '${error._id}'"`;
    logger.error(message);
    throw new Error();
  } else if (error.name === "CastError") {
    logger.error(error.reason);
    throw new Error(error.reason);    
  } else {
    logger.error(error);
    throw new Error("Error in database!");
  }
};
