// Entity - Menu

var buildMakeMenu = function(menuValidator){
  return async ({
    name,
    description,
    recipes,
  } = {}) => {

    var error = menuValidator({
      name,
      description,
      recipes
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getName: () => name,
      getDescription: () => description,
      getRecipes: () => recipes
    });
    
  };

};


module.exports = buildMakeMenu;
