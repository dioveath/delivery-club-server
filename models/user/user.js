// Entity - User

var buildMakeUser = function(userValidator, bcrypt){
  return async ({
    name,
    password,    
    email, 
    address,
    postcode,
    phone_number,
    profile_link,
    orders
  } = {}) => {

    var error = userValidator({
      name,
      password,
      email,
      address,
      postcode,
      phone_number,
      profile_link,
      orders
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
      getProfileLink: () => profile_link,
      getOrders: () => orders
    });
    
  };

};


module.exports = buildMakeUser;
