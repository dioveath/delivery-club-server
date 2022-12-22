// Entity - User

var buildMakeUser = function(userValidator, bcrypt){
  return async ({
    name,
    password,    
    email, 
    address,
    postcode,
    phone_number,
    whatwords,
    profile_link,
    orders,
    zones
  } = {}) => {

    var error = userValidator({
      name,
      password,
      email,
      address,
      postcode,
      phone_number,
      whatwords,
      profile_link,
      orders,
      zones
    });

    if(error instanceof Object) throw new Error(error.errorList);

    // create password hash
    const saltRounds = 5;
    var salt;
    var hashedPassword;

    if(password != undefined) {
      salt = await bcrypt.genSalt(saltRounds);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    return Object.freeze({
      getName: () => name,
      getPassword: () => hashedPassword,
      getEmail: () => email,
      getAddress: () => address,
      getPostcode: () => postcode,
      getPhoneNumber: () => phone_number,
      getWhatWords: () => whatwords,
      getProfileLink: () => profile_link,
      getOrders: () => orders,
      getZones: () => zones
    });
    
  };

};


module.exports = buildMakeUser;
