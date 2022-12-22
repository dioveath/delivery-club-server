// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (user) => {
  return {
    id: user._id,
    name: user.name,
    password: user.password,
    email: user.email,
    address: user.address,
    postcode: user.postcode,
    phone_number: user.phone_number,
    whatwords: user.whatwords,
    profile_link: user.profile_link,
    orders: user.orders,
    zones: user.zones,
    phone_verified: user.phone_verified,
    email_verified: user.email_verified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
