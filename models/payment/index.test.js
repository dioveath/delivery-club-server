// tests makePayment

const chai = require('chai');
const expect = chai.expect;
const { makePayment } = require('./index');

describe('makePayment', ()=> {
  
  it('tests makePayment makes a valid payment', async () => {
    
    var validPaymentInfoPayload = {
      order_id: '614b6844e28ef411e800368d',
      status: 'pending',
      payment_method: 'cash'
    };

    var input = await makePayment(validPaymentInfoPayload);

    expect(input).to.have.keys([
      "getOrderId",
      "getStatus",
      "getPaymentMethod"
    ]);

  });

  it('tests makePayment throws error for payment with phone_number not 10 digits', async () => {
    var invalidPaymentInfoPayload = {
      order_id: '614b6844e28ef411e800368d',
      status: 'not complete',
      payment_method: 'hero'
    };

    var expectedValue = {
      message: '"status" must be one of [pending, complete, failed],"payment_method" must be one of [cash, card, coupon]',
    };

    try {
      await makePayment(invalidPaymentInfoPayload);
    } catch (error){
      expect(error).to.have.property('message');
      expect(error.message).to.equal(expectedValue.message);
    }

  });

});
