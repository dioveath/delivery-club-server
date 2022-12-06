// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (user) => {
  return {
    id: user._id,
    name: user.name,
    description: user.description,
    recipes: user.recipes
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
