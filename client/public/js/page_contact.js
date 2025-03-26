document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn chặn gửi form mặc định

    // Hiển thị thông báo thành công và ẩn đi sau 3 giây
    successMessage.classList.remove("hidden");
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 3000);

    // Reset form sau khi gửi
    contactForm.reset();
  });
});
