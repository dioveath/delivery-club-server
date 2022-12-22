// tests makeUser

const chai = require('chai');
const expect = chai.expect;
const { makeUser } = require('./index');

describe('makeUser', ()=> {
  
  it('tests makeUser makes a valid user', async () => {
    
    var validUserInfoPayload = {
      name: "Dough and Crust",
      password: "thisiskhatrabahadur",
      email: "doughandcrust@gmail.com",
      address: "Loughbrough",
      postcode: "LE11 1EU",
      phone_number: "7943221348",
      whatwords: "three some chicken",
      profile_link: "",
      orders: [],
      zones: []
    };

    var input = await makeUser(validUserInfoPayload);

    expect(input).to.have.keys([
      "getName",
      "getPassword",
      "getEmail",
      "getAddress",
      "getPostcode",
      "getPhoneNumber",
      "getWhatWords",
      "getProfileLink",
      "getOrders",
      "getZones"
    ]);

  });

  it('tests makeUser throws error for user with phone_number not 10 digits', async () => {
    var invalidUserInfoPayload = {
      name: "Loco Maxicano",
      password: "locopassword",
      email: "locomexicano@gmail.com", 
      address: "sagaraha",
      postcode: "TW13 4AB",
      phone_number: "9999",
      whatwords: "green orange pepper",
      profile_link: "",
      orders: [],
      zones: []
    };

    var expectedValue = {
      message: '"phone_number" length must be 10 characters long',
    };

    try {
      await makeUser(invalidUserInfoPayload);
    } catch (error){
      expect(error).to.have.property('message');
      expect(error.message).to.equal(expectedValue.message);
    }

  });

});
