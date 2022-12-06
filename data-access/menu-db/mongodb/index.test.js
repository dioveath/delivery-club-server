// Test all data-access of user

const chai = require('chai');
const expect = chai.expect;

const { resetSeedMenus, closeConnection } = require('../../../db/mongodb/seed');
const { addMenu } = require('./index');

// TODO: implement test case later.. if needed..!!
describe('Menu Data Access with Mongoose', () => {

  before(async () => {
    await resetSeedMenus();
  }); 

  it('tests addMenu', async () => {
    const menuInfo = {
      name: "Seasonal Menu",
      description: "Best of current season menu!",
      recipes: []
    };      

    const addedMenu = await addMenu(menuInfo);

    expect(addedMenu).to.have.all.keys('id', 'name', 'description', 'recipes');
  });

  afterEach(async function(done) {
    // closeConnection();
    done();
  });

});
