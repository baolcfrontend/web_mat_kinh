// thực hiện thao tác CRUD  với collction categories
const userModel = require("./user.model");
const bcrypt = require("bcryptjs");
module.exports = { getAlluser, addUsers, updateUsers, deleteUser, resign, login };

// Đăng ký user mới
async function resign(data) {
  try {
    // Lấy dữ liệu từ form
    const { name, email, password, role } = data;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }

    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Tạo user mới
    const newUser = new userModel({ name, email, password: hash, role });
    const result = await newUser.save();

    // Xóa password trước khi trả về
    const userObj = result.toObject();
    delete userObj.password;

    return { status: true, message: "Đăng ký thành công", user: userObj };
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi đăng ký người dùng");
  }
}

// Đăng nhập user
async function login(data) {
  try {
    const { email, password } = data;

    // Kiểm tra email có tồn tại không
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Email chưa được đăng ký");
    }

    // Kiểm tra mật khẩu
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Mật khẩu không đúng");
    }

    // Xóa mật khẩu trước khi trả về
    const userObj = user.toObject();
    delete userObj.password;

    return { status: true, message: "Đăng nhập thành công", user: userObj };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
// lấy toàn  dữ liệu
async function getAlluser() {
  try {
    const users = await userModel.find(); // tìm kiếm lấy toàn bộ dữ liệu
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dũ liệu");
  }
}

// thêm danh mục
async function addUsers(data) {
  try {
    const { name, email, password, role } = data;
    const newUser = new userModel({
      name,
      email,
      password,
      role,
    });

    const result = await newUser.save();
    return result;
  } catch (error) {
    console.error("Lỗi khi thêm người dùng:", error);
    throw new Error("Lỗi thêm dữ liệu");
  }
}
// update người dùngc
async function updateUsers(data, id) {
  try {
    const Users = await userModel.findById(id);
    if (!Users) {
      throw new Error(" không tồn tại");
    }
    const { name, email, password, role } = data;
    const result = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        role,
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
async function deleteUser(id) {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    const result = await userModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log(error.message);
    throw new Error("Lỗi xóa dữ liệu");
  }
}
// show ra trang web
