var express = require("express");
var router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const checkfile = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new Error("Bạn chỉ được upload file ảnh"));
  }
  callback(null, true);
};
const upload = multer({ storage: storage, fileFilter: checkfile });
const productController = require("../mongo/products.controller");
// lấy dữ liệu
router.get("/", async (req, res) => {
  try {
    const result = await productController.getAllPro();
    return res.status(200).json({ status: true, result }); // trả về dữ liệu thành công
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
});
// tìm kiếm
// Route tìm kiếm sản phẩm
router.get("/search", productController.keyword);
router.get("/phantrang", async (req, res) => {
  try {
      const { page, limit } = req.query;
      const currentPage = parseInt(page) || 1;
      const perPage = parseInt(limit) || 5;

      const result = await productController.getPhantrang(currentPage, perPage);

      return res.status(200).json({
          status: true,
          products: result.products,
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: Math.ceil(result.total / result.limit),
      });
  } catch (error) {
    console.error("Lỗi API:", error);
      return res.status(500).json({ status: false, message: "Lỗi server", error: error.message });
  }
});
//http://localhost:3000/products/phantrang?page=1&limit=2

// lấy theo id
router.get("/:id", async (req, res) => {0
  try {
    const { id } = req.params;
    const result = await productController.getProById(id);
    return res.status(200).json({ status: true, result }); // trả về dữ liệu thành công
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
});

router.get("/cate/:id", async (req, res) => {
  try {
    const cateId = req.params.id;
    console.log("Gọi API với cateId:", cateId);

    const result = await productController.getProByCate(cateId);

    return res.status(200).json({ status: true, result });
  } catch (error) {
    console.error("Lỗi khi xử lý request:", error.message);
    return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
});
// // Route lấy danh sách sản phẩm liên quan
// router.get("/related/:productId/:categoryId", async (req, res) => {
//   try {
//     const { productId, categoryId } = req.params;
//     // Sử dụng await để gọi hàm bất đồng bộ
//     const products = await productController.getRelatedProducts(productId, categoryId);
//     res.status(200).json(products); // Trả về danh sách sản phẩm
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


router.post("/add", upload.single("img"), async (req, res) => {
  try {
    const data = req.body;
    data.img = req.file.originalname;
    const result = await productController.addPro(data);
    return res.status(200).json({ status: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "lỗi khi thêm dữ liệu" });
  }
});
// update sản phẩm
router.put("/update/:id", upload.single("img"), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.file) {
      data.img = req.file.originalname;
    } else {
      delete data.img;
    }

    const result = await productController.updateProduct(data, id);
    return res.status(200).json({ status: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "lỗi khi cập nhật dữ liệu" });
  }
});

// xóa sản phẩm
router.delete('/delete/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const result = await productController.deleteProduct(id);
    return res.status(200).json({status: true, result});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'lỗi khi xóa dữ liệu'});
  }
});

module.exports = router;
