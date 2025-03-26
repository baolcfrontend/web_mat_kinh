
    // Thêm sự kiện toggle cho nút "Thêm thông tin"
    const toggleButton = document.querySelector(".toggle-button");
    const toggleContent = document.querySelector(".toggle-content");

    if (toggleButton && toggleContent) {
      toggleButton.addEventListener("click", function () {
        if (
          toggleContent.style.display === "none" ||
          toggleContent.style.display === ""
        ) {
          toggleContent.style.display = "block";
          toggleButton.innerHTML =
            '<i class="fa-solid fa-minus"></i> Đóng thông tin';
        } else {
          toggleContent.style.display = "none";
          toggleButton.innerHTML =
            '<i class="fa-solid fa-plus"></i> Thêm thông tin';
        }
      });
    } else {
      console.error("toggleButton hoặc toggleContent không tìm thấy.");
    }
  