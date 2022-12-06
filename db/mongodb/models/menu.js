const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var MenuSchema = new Schema({
  name: { type: String, unique: true },
  description: String,
  recipes: Array, 
}, { timestamps: true });

MenuSchema.plugin(uniqueValidator);
var Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
