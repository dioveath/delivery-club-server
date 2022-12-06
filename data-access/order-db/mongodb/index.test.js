// Test all data-access of user

const chai = require('chai');
const expect = chai.expect;

const { closeConnection } = require('../../../db/mongodb/seed');
const { addOrder, deleteOrder } = require('./index');

// TODO: implement test case later.. if needed..!!
describe('Order Data Access with Mongoose', () => {
  let test_id = undefined;

  before(async () => {
    // await resetSeedOrders();
  }); 

  it('tests addOrder', async () => {
    const orderInfo = {
      status: 'pending',
      ordered_by: '614b6844e28ef411e800368d',
      delivered_by: '614b6844e28ef411e800368d',
      recipes: [],
      total_amount: 20.99,
      location: 'Feltham',
      postcode: 'TW13 4AB'
    };      

    const addedOrder = await addOrder(orderInfo);
    test_id = addedOrder.id;

    expect(addedOrder).to.have.all.keys('id', 'status', 'ordered_by', 'delivered_by', 'recipes', 'total_amount', 'location', 'postcode');
  });

  afterEach(async function(done) {
    if(!test_id) await deleteOrder(test_id);
    // closeConnection();
    done();
  });

});
