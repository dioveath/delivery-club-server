// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (order) => {
  return {
    id: order._id,
    status: order.status,
    ordered_by: order.ordered_by,
    delivered_by: order.delivered_by,
    recipes: order.recipes,
    total_amount: order.total_amount,
    location: order.location,
    postcode: order.postcode
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
