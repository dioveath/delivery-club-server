// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (payment) => {
  return {
    id: payment._id,
    order_id: payment.order_id,
    status: payment.status,
    payment_method: payment.payment_method
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
