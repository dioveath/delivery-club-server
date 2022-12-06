// Test all data-access of user

const chai = require('chai');
const expect = chai.expect;

const { resetSeedUsers, closeConnection } = require('../../../db/mongodb/seed');
const { addUser } = require('./index');

// TODO: implement test case later.. if needed..!!
describe('User Data Access with Mongoose', () => {

  before(async () => {
    await resetSeedUsers();
  }); 

  it('tests addUser', async () => {
    const userInfo = {
      first_name: "Khatra",
      last_name: "Bahadur",
      password: "thisiskhatrabahadur",
      email: "khatrabahadur@gmail.com",
      address: "khatra sahar",
      postcode: "TW13 4AB",
      phone_number: "7944185084",
      dob: "11-2-2000",  // MM-DD-YYYY
      roles: ['614b6844e28ef411e800368d'],
      permissions: [],
      profile_link: ""
    };      

    const addedUser = await addUser(userInfo);

    expect(addedUser).to.have.property('id');
    expect(addedUser).to.have.property('first_name');
    expect(addedUser).to.have.property('last_name');
    expect(addedUser).to.have.property('password');
    expect(addedUser).to.have.property('email');
    expect(addedUser).to.have.property('address');
    expect(addedUser).to.have.property('postcode');
    expect(addedUser).to.have.property('phone_number');
    expect(addedUser).to.have.property('dob');
    expect(addedUser).to.have.property('profile_link');
    expect(addedUser).to.have.property('roles');
    expect(addedUser).to.have.property('permissions');
    expect(addedUser).to.have.property('phone_verified');
    expect(addedUser).to.have.property('email_verified');
    expect(addedUser).to.have.property('createdAt');
    expect(addedUser).to.have.property('updatedAt');        
  });

  afterEach(async function(done) {
    // closeConnection();
    done();
  });

});
