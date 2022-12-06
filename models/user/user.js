// Entity - User

var buildMakeUser = function(userValidator, bcrypt){
  return async ({
    first_name,
    last_name,
    password,    
    email, 
    address,
    postcode,
    phone_number,
    dob,
    roles,
    permissions,
    profile_link
  } = {}) => {

    var error = userValidator({
      first_name,
      last_name,
      password,      
      email, 
      address,
      postcode,
      phone_number,
      dob,
      roles,
      permissions,
      profile_link
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
      getFirstName: () => first_name,
      getLastName: () => last_name,
      getPassword: () => hashedPassword,
      getEmail: () => email,
      getPhoneNumber: () => phone_number,      
      getAddress: () => address,
      getPostcode: () => postcode,
      getDOB: () => dob,
      getRoles: () => roles,
      getPermissions: () => permissions,
      getProfileLink: () => profile_link,
    });
    
  };

};


module.exports = buildMakeUser;
