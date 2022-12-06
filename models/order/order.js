// Entity - Order

var buildMakeOrder = function(orderValidator){
  return async ({
    status,
    ordered_by,
    delivered_by,
    recipes,
    total_amount,
    location,
    postcode
  } = {}) => {

    var error = orderValidator({
      status,
      ordered_by,
      delivered_by,
      recipes,
      total_amount,
      location,
      postcode
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getStatus: () => status,
      getOrderedBy: () => ordered_by,
      getDeliveredBy: () => delivered_by,
      getRecipes: () => recipes,
      getTotalAmount: () => total_amount,
      getLocation: () => location,
      getPostcode: () => postcode
    });
    
  };

};


module.exports = buildMakeOrder;
