    const scrollContainer = document.getElementById('scroll-container');

    // Hàm cuộn mượt mà
    let scrollSpeed = 1; // Tốc độ cuộn
    const startScrolling = () => {
      scrollContainer.scrollLeft += scrollSpeed;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0; // Đặt lại khi cuộn hết
      }
      requestAnimationFrame(startScrolling);
    };

    startScrolling();
document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử menu và dropdown
    const userMenu = document.querySelector(".user-menu");
    const userDropdown = document.querySelector(".user-dropdown");

    // Khi rê chuột vào menu
    userMenu.addEventListener("mouseenter", function () {
        userDropdown.classList.add("active"); // Thêm lớp để hiển thị dropdown
    });

    // Khi rời chuột ra khỏi menu
    userMenu.addEventListener("mouseleave", function () {
        userDropdown.classList.remove("active"); // Xóa lớp để ẩn dropdown
    });
});
