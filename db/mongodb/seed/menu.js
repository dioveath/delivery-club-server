const { makeMenu } = require('../../../models/menu/index');
const Menu = require('../models/menu');

const menuData = [
  {
    name: 'Momo Land',
    description: 'Best momos directly from Nepal.',
    recipes: []
  },
  {
    name: 'Lunch',
    description: 'Delicate lunch are here!',
    recipes: []
  }
];


const seedMenus = async (data) => {
  let allPromises = [];

  console.log('Seeding menu datas...');
  data.forEach(async (menu) => {
    const obj = await makeMenu(menu);

    const menuPayload = {
      name: obj.getName(),
      description: obj.getDescription(),
      recipes: obj.getRecipes()
    };

    allPromises.push(Menu.create(menuPayload));
  });

  await Promise.all(allPromises);
  console.log('Seeding Complete!');
};


module.exports = {
  menuData,
  seedMenus
};
