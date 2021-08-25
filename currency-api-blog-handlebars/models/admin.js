const mongoose = require('mongoose');

// захардкодить админа - установить логин и пароль
const AdminSchema = mongoose.Schema({
  adminame: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  scrf_token: {
    type: String,
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
