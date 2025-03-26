// http://localhost:3000/products
var express = require("express");
var router = express.Router();

const products = [
  {id: "2",name: "GK. GỌNG NHỰA CỨNG AN086",price: 800000,salePrice: "",discountPercentage: "",img: "trong2.jpeg",description: "Gọng kính nhựa cứng, mã AN086.",quantity: 12,code: "AN086",width: "12cm",lengthmm: "11cm",glasses: "Plastic",color: ["Đen", "Trắng", "Xanh"],category: "4",dateAdded: "2025-01-15"},
  {id: "3",name: "GK. GỌNG CỐT KIM LOẠI AN226825",price: 500000,salePrice: "",discountPercentage: "",img: "trong3.jpeg",description: "Gọng kính chất liệu kim loại, mã AN226825.",quantity: 13,code: "AN226825",width: "13.5cm",lengthmm: "13cm",glasses: "Metal",color: ["Đen", "Xám", "Bạc"],category: "5",dateAdded: "2025-01-15"},
  {id: "4",name: "GK. GỌNG CÀNG KIM LOẠI AN221415",price: 400000,salePrice: "", discountPercentage: "",img: "ghi-5.jpeg",description: "Gọng kính càng kim loại, mã AN221415.",quantity: 12,code: "AN221415",width: "13cm",lengthmm: "12.5cm",glasses: "Metal",color: ["Đen", "Bạc"],category: "4",dateAdded: "2025-01-15"},
  {id: "5",name: "GK. GỌNG NHỰA CỨNG TITAN MỎNG",price: 1200000,salePrice: 1080000,discountPercentage: "10%",img: "trong4.jpeg", description: "Gọng kính cao cấp làm từ nhựa titan mỏng nhẹ.",quantity: 12,code: "TITAN-02",width: "14cm", lengthmm: "13cm",glasses: "Titan",color: ["Đen", "Vàng"],category: "1",dateAdded: "2025-01-15"},
  {id: "6",name: "GK. GỌNG NHỰA DẺO AN302",price: 950000,salePrice: 855000,discountPercentage: "10%", img: "trong3.jpeg", description: "Gọng kính nhựa dẻo, mã AN302.", quantity: 12, code: "AN302",width: "13cm", lengthmm: "12cm", glasses: "Plastic",color: ["Đen", "Đỏ", "Xanh Dương"],category: "2",dateAdded: "2025-01-15" },
  {id: "7",name: "GK. GỌNG KIM LOẠI MẠ VÀNG AN554", price: 700000, salePrice: 630000, discountPercentage: "10%", img: "trong2.jpeg",description: "Gọng kính kim loại mạ vàng, mã AN554.", quantity: 12, code: "AN554", width: "12.5cm",lengthmm: "12cm", glasses: "Metal",color: ["Vàng", "Bạc"], category: "3",dateAdded: "2025-01-15" },
  {id: "8",name: "GK. GỌNG VIỀN MỞ TITAN CAO CẤP",price: 1500000,salePrice: 1350000,discountPercentage: "10%", img: "trong1.jpeg",description: "Gọng kính titan thiết kế viền mở hiện đại.", quantity: 15,code: "TITAN-03",width: "14.5cm",lengthmm: "13.5cm",glasses: "Titan",color: ["Đen", "Xám"],category: "1", dateAdded: "2025-01-15"},
  {id: "9",name: "GK. GỌNG NHỰA CỨNG KÍNH TRÒN AN406", price: 850000,salePrice: "",discountPercentage: "",img: "ghi-4.jpeg",description: "Gọng kính nhựa cứng phong cách cổ điển, mã AN406.",quantity: 1,code: "AN406", width: "12.5cm",lengthmm: "11.5cm",glasses: "Plastic", color: ["Trắng", "Đen"], category: "2", dateAdded: "2025-01-15"},
  {id: "10", name: "GK. GỌNG KIM LOẠI CAO CẤP AN799", price: 600000, salePrice: "", discountPercentage: "",img: "ghi-5.jpeg", description: "Gọng kính kim loại chắc chắn, mã AN799.", quantity: 1, code: "AN799", width: "13cm", lengthmm: "12.5cm", glasses: "Metal", color: ["Đen", "Bạc"], category: "3", dateAdded: "2025-01-15"}
];

router.get("/", (req, res) => {
  try {
    // return res.send('Danh sách sản phẩm');
    // json
    return res.status(202).json({ status: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Lỗi hệ thống" });
  }
});
// http://localhost:3000/products/delete/2
router.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    const indexPro = products.findIndex((item) => item.id === parseInt(id));
    products.splice(indexPro, 1);
    return res
      .status(202)
      .json({
        status: true,
        newProduct: products,
        message: "Xóa sản phẩm thành công",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi xóa sản phẩms" });
  }
});
// http://localhost:3000/products/addpro
router.post("/addpro", (req, res) => {
  try {
    // lấy dữ liệu từ form
    const { name, price, images } = req.body;
    const proNew = { id: products.length + 1, name, price, images };
    products.push(proNew);
    return res
      .status(202)
      .json({
        status: true,
        newProduct: products,
        message: "Thêm sản phẩm thành công",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi thêm sản phẩm" });
  }
});
// http://localhost:3000/products/update/3
router.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, images } = req.body;
    const indexPro = products.findIndex((item) => item.id === parseInt(id))
    if (indexPro >= 0 ) {
        products[indexPro] = {
      name,
      price,
      images,
    };
    return res.status(202).json({status: true,newProduct: products,message: "Cập nhật sản phẩm thành công",});
    }else{
   return res
       .status(404)
       .json({ status: false, message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi thêm sản phẩm" });
  }
});
module.exports = router;
