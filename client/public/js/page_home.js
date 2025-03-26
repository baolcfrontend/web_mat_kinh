let currentIndex = 0;
function moveCarousel(direction) {
  const carousel = document.querySelector(".carousel");
  const products = document.querySelectorAll(".product");
  const productWidth = products[0].offsetWidth + 15; // product width + gap
  const visibleItems = Math.floor(
    document.querySelector(".carousel-container").offsetWidth / productWidth
  );
  const maxIndex = products.length - visibleItems;

  // Update currentIndex and apply bounds
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = maxIndex;
  } else if (currentIndex > maxIndex) {
    currentIndex = 0;
  }
  // Move carousel by changing transform property
  carousel.style.transform = `translateX(-${currentIndex * productWidth}px)`;
}
// JavaScript (optional, if you want to control the scrolling behavior)
const scrollContainer = document.querySelector(".social-scroll");
const buttons = document.querySelectorAll(".social-item button");

// Function to stop the animation
function pauseScroll() {
  scrollContainer.style.animationPlayState = "paused";
}

// Function to resume the animation
function resumeScroll() {
  scrollContainer.style.animationPlayState = "running";
}

// Add event listeners to each button only
buttons.forEach((button) => {
  button.addEventListener("mouseenter", pauseScroll); // Pause on button hover
  button.addEventListener("mouseleave", resumeScroll); // Resume when leaving button
});
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".social-scroll");
  const scrollItems = document.querySelectorAll(".social-item");

  let itemWidth = scrollItems[0].offsetWidth + 20; // Include the gap between items
  let totalWidth = itemWidth * scrollItems.length; // Total width of all items
  let scrollSpeed = 3; // Adjust speed here (higher number = slower scrolling)

  // Function to scroll the container automatically
  function autoScroll() {
    scrollContainer.scrollLeft += itemWidth;

    // Reset to the start once we reach the end
    if (
      scrollContainer.scrollLeft >=
      totalWidth - scrollContainer.offsetWidth
    ) {
      scrollContainer.scrollLeft = 0;
    }
  }

  // Start auto-scrolling
  let scrollInterval = setInterval(autoScroll, scrollSpeed * 100); // Adjust the multiplier for scroll speed
});
// document.getElementById("keyword").addEventListener("input", function () {
//   const resultList = document.getElementById("result-list");

//   // Giả sử dữ liệu sản phẩm có sẵn (hoặc tải từ API)
//   const products = ["Kính Titan Cao Cấp", "Kính Râm Polarized", "Gọng Nhựa Bền", "Gọng Kim Loại"];
  
//   const keyword = this.value.trim().toLowerCase();
//   if (keyword) {
//     const filteredProducts = products.filter(product => product.toLowerCase().includes(keyword));
    
//     resultList.innerHTML = `<ul>${filteredProducts.map(product => `<li><a href="#">${product}</a></li>`).join("")}</ul>`;
//     resultList.style.display = "block"; // Hiển thị kết quả
//   } else {
//     resultList.style.display = "none"; // Ẩn nếu không có từ khóa
//   }
// });

// // Ẩn danh sách kết quả khi nhấp ra ngoài
// document.addEventListener("click", function (event) {
//   const resultList = document.getElementById("result-list");
//   if (!event.target.closest(".search-container")) {
//     resultList.style.display = "none";
//   }
// });
