// tests makeOrder

const chai = require('chai');
const expect = chai.expect;
const { makeOrder } = require('./index');

describe('makeOrder', ()=> {
  
  it('tests makeOrder makes a valid order', async () => {
    
    var validOrderInfoPayload = {
      status: 'pending',
      ordered_by: '614b6844e28ef411e800368d',
      delivered_by: '614b6844e28ef411e800368d',
      recipes: [],
      total_amount: 20.99,
      location: 'Feltham',
      postcode: "TW13 4AB"
    };

    var input = await makeOrder(validOrderInfoPayload);

    expect(input).to.have.keys([
      "getStatus",
      "getOrderedBy",
      "getDeliveredBy",
      "getRecipes",
      "getTotalAmount",
      "getLocation",
      "getPostcode"
    ]);

  });

  it('tests makeOrder throws error for order with phone_number not 10 digits', async () => {
    var invalidOrderInfoPayload = {
      status: 'pending',
      ordered_by: "614b6844e28ef411e800368d",
      delivered_by: "614b6844e28ef411e800368d",
      recipes: [],
      total_amount: "adsda",
      location: "Feltham",
      postcode: "TW13 4AB"
    };

    var expectedValue = {
      message: '"total_amount" must be a number',
    };

    try {
      await makeOrder(invalidOrderInfoPayload);
    } catch (error){
      expect(error).to.have.property('message');
      expect(error.message).to.equal(expectedValue.message);
    }

  });

});
