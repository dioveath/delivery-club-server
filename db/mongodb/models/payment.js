const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var PaymentSchema = new Schema({
  order_id: Schema.Types.ObjectId,
  status: String,
  payment_method: String
}, { timestamps: true });

PaymentSchema.plugin(uniqueValidator);
var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
