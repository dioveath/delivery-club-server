// tests makeMenu

const chai = require('chai');
const expect = chai.expect;
const { makeMenu } = require('./index');

describe('makeMenu', ()=> {
  
  it('tests makeMenu makes a valid menu', async () => {
    
    var validMenuInfoPayload = {
      name: "Seasonal Menu",
      description: "Best of current season menu!",
      recipes: []
    };

    var input = await makeMenu(validMenuInfoPayload);


    expect(input).to.have.keys([
      "getName",
      "getDescription",
      "getRecipes"
    ]);

  });


});
