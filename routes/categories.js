//http://localhost:3000/categories
var express = require('express');
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
const categoryController = require('../mongo/category.controller');
const categoryModel = require('../mongo/category.model');
// lấy dữ liệu
router.get('/', async(req, res) => {
        try{
            const result = await categoryController.getAllCate();
            return res.status(200).json({status: true , result});  // trả về dữ liệu thành công
        }catch(error){
            console.log(error);
          return  res.status(500).json({error: 'Lỗi khi lấy dữ liệu'});
        }
});
// thêm danh mục
router.post('/add', upload.single("image"), async (req, res) => {
  try {
    const data = req.body;
    data.image = req.file.originalname;
    const result = await categoryController.addCate(data);
    return res.status(200).json({ status: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "lỗi khi thêm dữ liệu" });
  }
});
// lấy theo id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryController.getCateById(id);
    return res.status(200).json({ status: true, result }); // trả về dữ liệu thành công
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
});
// cập nhật danh mục
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.file) {
      data.img = req.file.originalname;
    } else {
      delete data.img;
    }

    const result = await categoryController.updateCate(data, id);
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
    const result = await categoryController.deleteCate(id);
    return res.status(200).json({status: true, result});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'lỗi khi xóa dữ liệu'});
  }
});
module.exports = router;
