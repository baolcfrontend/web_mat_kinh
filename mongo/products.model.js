// kết nối collection categories
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const productSchema = new Schema({
  name: { type: String, required: false },
  price: { type: String, required: false },
  salePrice: { type: String, required: false },   // Kiểu Number
  description: { type: String, required: false },
  discountPercentage: { type: String, required: false }, // Kiểu Number
  img: { type: String, required: false },
  quantity: { type: Number, required: false },
  width: { type: String, required: false },  // Kiểu String vì có cm phía sau
  lengthmm: { type: String, required: false }, // Kiểu String vì có cm phia sau
  code: { type: String, required: false },
  glasses: { type: String, required: false },
  color: { type: [String], required: false },  // Mảng các chuỗi
  categoryId: {
    id: { type: ObjectId, required: true},
    name: { type: String, required: true}
  },
  hot: { type: Number, required: false },
  dateAdded: { type: Date, default: Date.now },
});
module.exports = mongoose.models.product || mongoose.model('product', productSchema);