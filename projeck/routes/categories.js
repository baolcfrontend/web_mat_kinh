// http://localhost:3000/categorys
var express = require("express");
var router = express.Router();
const categories = [
  {id: "1", name: "Gọng kính Titan",image: "anh8.jpg"},
  {id: "2",name: "Gọng kính Nhựa",image: "anh9.jpg"},
  {id: "3",name: "Gọng kính Kim loại",image: "anh10.jpg"},
  {id: "4",name: "Gọng kính Thời trang",image: "anh12.jpg"},
  {id: "5",name: "Gọng kính Trẻ em",image: "anh14.jpg"}
];

router.get("/", (req, res) => {
  try {
    // return res.send('Danh sách danh mục');
    // json
    return res.status(202).json({ status: true,categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Lỗi hệ thống" });
  }
});
// http://localhost:3000/categorys/delete/2
router.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    const indexCate = categories.findIndex((item) => item.id === parseInt(id));
    categories.splice(indexCate, 1);
    return res
      .status(202)
      .json({
        status: true,
        newcategory: categories,
        message: "Xóa danh mục thành công",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
     .json({ status: false, message: "Lỗi xóa danh mục" });
  }
});
// http://localhost:3000/categorys/addpro
router.post("/addcate", (req, res) => {
  try {
    // lấy dữ liệu từ form
    const { name,  images } = req.body;
    const cteNew = { id: categories.length + 1, name,  images };
    categories.push(cteNew);
    return res
      .status(202)
      .json({
        status: true,
        newcategory: categories,
        message: "Thêm danh mục thành công",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi thêm danh mục" });
  }
});
// http://localhost:3000/categorys/update/3
router.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name,  images } = req.body;
    const indexCate = categories.findIndex((item) => item.id === parseInt(id))
    if (indexCate >= 0 ) {
      categories[indexCate] = {
      name,
      images,
    };
    return res.status(202).json({status: true,newcategory:categories,message: "Cập nhật danh mục thành công",});
    }else{
   return res
       .status(404)
       .json({ status: false, message: "Không tìm thấy danh mục" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi thêm danh mục" });
  }
});
module.exports = router;
