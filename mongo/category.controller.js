// thực hiện thao tác CRUD  với collction categories
const categoryModel = require("./category.model");
const productModel = require("./products.model");
module.exports = { getAllCate, addCate, updateCate, deleteCate, getCateById };
// lấy toàn bộ dữ liệu
async function getAllCate() {
  try {
    const categories = await categoryModel.find(); // tìm kiếm lấy toàn bộ dữ liệu
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dũ liệu");
  }
}

// lấy dữ liệu theo id
async function getCateById(id) {
  try {
    const cate = await categoryModel.findById(id);

    return cate;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dữ liệu");
  }
}
// thêm danh mục
async function addCate(data) {
  try {
    const { name, image } = data;
    const newCate = new categoryModel({
      name,
      image,
    });

    const result = await newCate.save();
    return result;
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error);
    throw new Error("Lỗi thêm dữ liệu");
  }
}
// update danh mục
async function updateCate(data, id) {
  try {
    const Cate = await categoryModel.findById(id);
    if (!Cate) {
      throw new Error("Danh mục không tồn tại");
    }
    const { name, image} = data;
    const result = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        image,
      },
      { new: true }
    );

    return result;
  } catch (error) {
    console.log(error.message);
    throw new Error("Lỗi cập nhật dữ liệu");
  }
}
// xóa dữ liệu
async function deleteCate(id) {
  try {
    const cate = await categoryModel.findById(id);

    // kiểm tra xem sản phẩm này còn sản phẩm hay không
    if (!cate) {
      throw new Error("Danh mục không tồn tại");
    }
    const pros = await productModel.find({ "categoryId.id": id });
    if (pros.length > 0) {
      throw new Error("Danh mục này còn sản phẩm, không thể xóa");
    }
    
    const result = await categoryModel.findByIdAndDelete(id);
    if (!deleteCate) {
        throw new Error("không thể xóa vì không tìm thấy danh mục")
    }
    return result;
  } catch (error) {
    console.log(error.message);
    throw new Error("Lỗi xóa dữ liệu");
  }
}
