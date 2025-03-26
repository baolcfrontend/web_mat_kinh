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
const userModel = require('../mongo/user.controller');
const userController = require('../mongo/user.controller');
// lấy dữ liệu
router.get('/', async(req, res) => {
        try{
            const result = await userController.getAlluser();
            return res.status(200).json({status: true , result});  // trả về dữ liệu thành công
        }catch(error){
            console.log(error);
          return  res.status(500).json({error: 'Lỗi khi lấy dữ liệu'});
        }
});

// thêm người dùng
router.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const result = await userController.addUsers(data);
    return res.status(200).json({ status: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "lỗi khi thêm dữ liệu" });
  }
});


// cập nhật danh mục
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await userController.updateUsers(data, id);
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
    const result = await userController.deleteUser(id);
    return res.status(200).json({status: true, result});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'lỗi khi xóa dữ liệu'});
  }
});
// người dùng đăng kí
router.post('/register', async (req, res) => {
  try {
    const data = req.body;
    const result = await userController.resign(data);
    return res.status(200).json({ status: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "lỗi khi đăng kí" });
  }
});
// // Đăng ký user mới
// router.post("/register", async (req, res) => {
//   try {
//     const result = await userController.resign(req.body);
//     res.status(result.status ? 201 : 400).json(result);
//   } catch (error) {
//     console.error("Lỗi khi đăng ký:", error);
//     res.status(500).json({ status: false, message: "Lỗi server" });
//   }
// });

// Đăng nhập user
router.post("/login", async (req, res) => {
  try {
    const result = await userController.login(req.body);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
});
router.get("/check-email", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Lỗi khi kiểm tra email:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
