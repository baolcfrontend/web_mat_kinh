// http://localhost:3000/users
var express = require('express');
var router = express.Router();
const users = [
  {id: "1",name: "bảo",email: "bao123lacao@gmail.com",password: "1233123",role: "student"},
  {id: "2",name: "bảo",email: "bao123@gmail.com",password: "1233123",role: "student"},
  {id: "3",name: "bảo",email: "bao@gmail.com",password: "1233123",role: "student"},
  {id: "4",name: "bảo",email: "bao41487@gmail.com",password: "bao123",role: "student"},
  {id: "5",name: "bảo",email: "baolcps@gmail.com",password: "1241242",role: "student"},
  {id: "6",name: "bảo",email: "baolcps2222@gmail.com",password: "baolcps41487",role: "student"},
  {id: "7",name: "thaycuong",email: "cuong123@gmail.com",password: "bao123",role: "student"},
  {id: "8",name: "Lê Chí Bảo",email: "baolcps41487@gmail.com",password: "1234",role: "admin"},
  {id: "9",name: "Lê Chí Bảo",email: "baolcps41487@gmail.com",password: "123123",role: "admin"},
  {id: "10",name: "Lê Chí Bảo",email: "baolcps41487@gmail.com",password: "1234",role: "admin"}
];

router.get('/', (req, res) => {
   try {
    // return res.send('Danh sách sản phẩm');
    // json
    return res.status(202).json({ status: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Lỗi hệ thống" });
  }
})
// http://localhost:3000/users/delete/2
router.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    const indexUse = users.findIndex((item) => item.id === parseInt(id));
    users.splice(indexUse, 1);
    return res
      .status(202)
      .json({
        status: true,
        newUsers: users,
        message: "Xóa người dùng thành công",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi xóa người dùng" });
  }
});

// http://localhost:3000/users/adduser
router.post("/adduser", (req, res) => {
  try {
    // lấy dữ liệu từ form
    const { name, email, password, role } = req.body;
    const useNew = { id: users.length + 1, name, email, password, role };
    users.push(useNew);
    return res
      .status(202)
      .json({
        status: true,
        newUsers: users,
        message: "Thêm người dùng thành công",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi thêm người dùng" });
  }
});
// http://localhost:3000/users/update/3
router.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const indexUse = users.findIndex((item) => item.id === parseInt(id))
    if (indexUse >= 0 ) {
        users[indexUse] = {
      name,
      email,
      password,
      role,
    };
    return res.status(202).json({status: true,newUsers: users,message: "Cập nhật người dùng thành công",});
    }else{
   return res
       .status(404)
       .json({ status: false, message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi thêm người dùng" });
  }
});
module.exports = router;

