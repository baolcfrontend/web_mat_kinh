
// Hàm cập nhật giỏ hàng trong dropdown
async function updateDropdownCart() {
    const cartItems = await getCartFromDatabase();
      // Lấy giỏ hàng từ Database
    
    const cartItemsList = document.querySelector("#cart-items");
    console.log('ặc ặc ặc');
    
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    // Xóa các mục trong dropdown trước khi thêm mới
    cartItemsList.innerHTML = ``;
   
    let total = 0;
    let itemCount = 0;

    // Duyệt qua các sản phẩm trong giỏ hàng và cập nhật giao diện
    cartItems.forEach((item) => {
        total += item.price * item.quantity;  // Tính tổng tiền
        itemCount += item.quantity;  // Cập nhật số lượng

        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <img src="./public/img/${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price * item.quantity} VND</span>
                <span class="cart-item-quantity">Số lượng: ${item.quantity}</span>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    });

    // Cập nhật số lượng giỏ hàng và tổng tiền trong dropdown
    cartCount.textContent = itemCount;
    cartTotal.textContent = total.toFixed(2) + " VND";
}

// Hàm lấy giỏ hàng từ database
async function getCartFromDatabase() {
    const response = await fetch("http://localhost:3000/cart");  // Lấy dữ liệu từ API hoặc từ Server
    const cart = response.json();
    return cart;
} 

// Sau khi thêm sản phẩm vào giỏ hàng // Cập nhật giỏ hàng trong dropdown
document.addEventListener("DOMContentLoaded", async function () {
    // Cập nhật giỏ hàng sau khi trang được tải
    await updateDropdownCart();

});