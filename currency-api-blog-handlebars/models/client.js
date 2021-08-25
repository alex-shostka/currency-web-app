const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  wechatId: {
    type: String,
    unique: true,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  currency: {
    type: String, // RUB, UAH, BYN, KZT
    required: true
  },
  status: {
    type: String, // basic, bronze, серебро, gold, platinum
    default: 'basic',
    required: true
  },
  tradeDate: {
    type: Date,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Client', ClientSchema);
