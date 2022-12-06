const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var OrderSchema = new Schema({
  status: String,
  ordered_by: Schema.Types.ObjectId,
  delivered_by: Schema.Types.ObjectId,
  recipes: Array,
  total_amount: Number,
  location: String,
  postcode: String
}, { timestamps: true });

OrderSchema.plugin(uniqueValidator);
var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
