// thực hiện thao tác CRUD  với collction categories
const categoryModel = require("./category.model");
const productModel = require("./products.model");

module.exports = { getAllPro, getProByCate, getProById, addPro, updateProduct, deleteProduct, keyword, getPhantrang };
//  getRelatedProducts
// lấy toàn bộ dữ liệu
async function getAllPro() {
  try {
   const products = await productModel.find(); // tìm kiếm lấy toàn bộ dữ liệu
    // lấy dữ liệu có điều kiên 
    //  Bài 2: Lấy danh sách sản phẩm nổi bật có hot =1
    const result_noi_bat = await productModel.find({ hot: 1 });
    
    //Bài 3:Lấy danh sách sản phẩm theo trang và giới hạn số lượng
//   const page = parseInt(req.query.page) || 1; // Đảm bảo luôn là số
// const limit = 5; // Số lượng sản phẩm mỗi trang
// const skip = limit * (page - 1);

// const resultbai3 = await productModel.find().limit(limit).skip(skip);
// res.json({
//     success: true,
//     page,
//     limit,
//     data: products
// });
//  res.json(resultbai3);
    // select * from products like '%a%'
    //Bài 4: Tìm kiếm sản phẩm
    const result5 = await productModel.find({
      name: { $regex: "a", $options: "i" },
    });
    // Bài 5: Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng
   //select * from products limit 5 order by _id asc
    const result = await productModel.find().limit(5).sort({ _id: -1 });
    //select * name, price products
    const result1 = await productModel.find({}, { name: 1, price: 1 });
    //select * from products where price > 500.000
    // Bài 7: Tìm và xóa sản phẩm có điều kiện (ví dụ: xóa sản phẩm có giá < 100.000)
    const result2 = await productModel.find({ price: { $gt: 500000 } });
    // $gt: lớn hơn
    // $gte: lớn hơn hoặc bằng
    // $lt: bé hơn
    // 
    // $lte: bé hơn hoặc bằng
    // $eq: bằng
    // $ne: khác
    // $in: trong mảng
    // $nin: không trong mảng
    // select * from products where price > 500.000 and quantity < 15
    const result4 = await productModel.find({
      price: { $gt: 500000 },
      quantity: { $lt: 15 },
    });
    //or:[]
  

    return products;
    // show ra trang web
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dũ liệu");
  }
}
async function keyword(req, res) {
  try {
    console.log("Query received:", req.query); // Debug xem query có nhận đúng không

    const { name } = req.query; // Lấy từ khóa từ query string

    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Vui lòng nhập từ khóa tìm kiếm" });
    }

    // Tìm kiếm sản phẩm theo tên (không phân biệt hoa thường)
    const result = await productModel.find({
      name: { $regex: name, $options: "i" },
    });

    if (result.length === 0) {
      return res.json({ success: false, message: "Không tìm thấy sản phẩm nào" });
    }

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Lỗi tìm kiếm sản phẩm:", error);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}
async function getPhantrang(page = 1, limit = 5) {
  try {
      const skip = (page - 1) * limit;

      const products = await productModel.find({})
          .skip(skip)
          .limit(limit);

      const totalProducts = await productModel.countDocuments();

      return { products, total: totalProducts, page, limit };
  } catch (error) {
      console.error(" Lỗi lấy sản phẩm:", error);
      throw new Error("Lỗi server");
  }
}

// lấy dữ liệu theo id
async function getProById(id) {
  try {
    const product = await productModel.findById(id);

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dữ liệu");
  }
}

const mongoose = require("mongoose");

//* lấy sản phẩm theo danh mục
async function getProByCate(cateId) {
  try {
    console.log("cateId nhận được:", cateId);

    if (!mongoose.Types.ObjectId.isValid(cateId)) {
      throw new Error("ID danh mục không hợp lệ");
    }

    const products = await productModel.find({ "categoryId.id": cateId }).limit(8);

    if (!products.length) {
      console.log("Không tìm thấy sản phẩm nào thuộc danh mục này.");
    }

    return products;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo danh mục:", error.message);
    throw new Error("Lỗi lấy dữ liệu");
  }
}
// // Bài 6: Lấy danh sách sản phẩm liên quan (cùng danh mục) với sản phẩm hiện tại
// async function getRelatedProducts(productId, categoryId) {
//   try {
//     // Sửa phần categoryId để lấy đúng dữ liệu từ MongoDB
//     const products = await productModel.find({
//       _id: { $ne: productId }, // Loại bỏ sản phẩm hiện tại
//       'categoryId.id': categoryId, // Sử dụng 'categoryId.id' để truy vấn đúng
//     }).limit(5); // Giới hạn 5 sản phẩm liên quan
//     return products;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Lỗi lấy danh sách sản phẩm liên quan");
//   }
// }



// thêm dữ liệu

async function addPro(data) {
  try {
    const {
      name,
      price,
      salePrice,
      description,
      discountPercentage,
      img,
      quantity,
      width,
      lengthmm,
      code,
      glasses,
      color,
      categoryId,
      hot,
      dateAdded,
    } = data;
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      throw new Error("Danh mục không tồn tại");
    }

    const newProduct = new productModel({
      name,
      price,
      salePrice,
      description,
      discountPercentage,
      img,
      quantity,
      width,
      lengthmm,
      code,
      glasses,
      color,
      categoryId: { id: category._id, name: category.name },
      hot,
      dateAdded,
    });

    const result = await newProduct.save();
    return result;
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    throw new Error("Lỗi thêm dữ liệu");
  }
}
// cập nhật dữ liệu
// Thêm dòng này vào đầu file
async function updateProduct(data, id) {
    try {
        // Kiểm tra id có hợp lệ không
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     throw new Error("ID sản phẩm không hợp lệ");
        // }

        const pro = await productModel.findById(id);
        if (!pro) {
            throw new Error("Sản phẩm không tồn tại");
        }

        const {
            name, price, salePrice, description, discountPercentage,
            img, quantity, width, lengthmm, code, glasses, color,
            categoryId, hot, dateAdded
        } = data;

        let categoryFind = null;
        if (categoryId) {
            categoryFind = await categoryModel.findById(categoryId);
        }

        let categoryUpdate = categoryFind
            ? { id: categoryFind._id, name: categoryFind.name }
            : pro.categoryId;

        const result = await productModel.findByIdAndUpdate(
            id,
            {
                name, price, salePrice, description, discountPercentage,
                img, quantity, width, lengthmm, code, glasses, color,
                categoryId: categoryUpdate, hot, dateAdded,
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
async function deleteProduct(id) {
    try {
        const pro = await productModel.findById(id);
        if (!pro) {
            throw new Error("Sản phẩm không tồn tại");
        }

        const result = await productModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log(error.message);
        throw new Error("Lỗi xóa dữ liệu");
    }
}