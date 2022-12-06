// Test all data-access of payment

const chai = require('chai');
const expect = chai.expect;

const { closeConnection } = require('../../../db/mongodb/seed');
const { addPayment, deletePayment } = require('./index');

// TODO: implement test case later.. if needed..!!
describe('Payment Data Access with Mongoose', () => {
  let test_id = undefined;

  before(async () => {
    // await resetSeedPayments();
  }); 

  it('tests addPayment', async () => {
    const paymentInfo = {
      order_id: '614b6844e28ef411e800368d',
      status: 'pending',
      payment_method: 'cash'
    };

    const addedPayment = await addPayment(paymentInfo);
    test_id = addedPayment.id;

    expect(addedPayment).to.have.all.keys('id', 'order_id', 'status', 'payment_method');
  });

  afterEach(async function(done) {
    if(!test_id) await deletePayment(test_id);
    // closeConnection();
    done();
  });

});
