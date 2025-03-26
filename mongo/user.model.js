// kết nối collection categories
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: false, default: 0},
});
module.exports = mongoose.models.user || mongoose.model('user', userSchema);  