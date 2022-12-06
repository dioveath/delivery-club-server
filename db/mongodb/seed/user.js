const { makeUser } = require('../../../models/user/index');
const User = require('../models/user');

const userData = [
  {
    first_name: "Khatra",
    last_name: "Bahadur",
    password: "thisiskhatrabahadur",
    email: "khatraishere@gmail.com",
    phone_number: "9812345678",
    address: "khatra sahar",
    postcode: "TW13 4AB",
    dob: "2-13-1999",
    roles: [],
    permissions: [],
    profile_link: "link"
  },
  {
    first_name: "Himal",
    last_name: "Sarkar",
    password: "sarkarisdope",
    email: "himalisdope@gmail.com",
    phone_number: "9842012345",
    address: "sagarmatha",
    postcode: "TW13 4AB",    
    dob: "4-18-1995",
    phone_verified: false,
    email_verified: false,
    roles: [],
    permissions: [],
    profile_link: "link"
  },
  {
    first_name: "Summer",
    last_name: "Winter",
    gaming_name: "summeriswinter",
    password: "contradiction",
    email: "summerflower@gamil.com",
    phone_number: "9999911111",
    address: "sagaraha",
    postcode: "TW13 4AB",    
    dob: "12-24-1996",
    phone_verified: false,
    email_verified: false,
    phone_verified: false,
    email_verified: false,
    roles: [],
    permissions: [],
    profile_link: "link"
  }
];

const seedUsers = async (data) => {
  let allPromises = [];

  console.log('Seeding user datas...');
  data.forEach(async (user) => {
    const obj = await makeUser(user);

    const userPayload = {
      first_name: obj.getFirstName(),
      last_name: obj.getLastName(),
      password: obj.getPassword(),
      email: obj.getEmail(),
      phone_number: obj.getPhoneNumber(),
      address: obj.getAddress(),
      postcode: obj.getPostcode(),
      roles: obj.getRoles(),
      permissions: obj.getPermissions(),
      profile_link: obj.getProfileLink()
    };
    
    allPromises.push(User.create(userPayload));
  });

  await Promise.all(allPromises);
  console.log('Seeding Complete!');
};


module.exports = {
  userData,
  seedUsers
};
