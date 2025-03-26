// 3. Toggle Product Description
function toggleDescription() {
  const description = document.getElementById("description");
  const toggleIcon = document.getElementById("toggle-icon");

  const isHidden =
    description.style.display === "none" || !description.style.display;
  description.style.display = isHidden ? "block" : "none";
  toggleIcon.classList.toggle("fa-plus", !isHidden);
  toggleIcon.classList.toggle("fa-minus", isHidden);
}

// Tạo sự kiện cho dấu cộng/dấu trừ
document.querySelector(".reviews-list h4").addEventListener("click", () => {
  const reviewsList = document.querySelector(".reviews-list");
  reviewsList.classList.toggle("collapsed");
});
// 4. Image Switching
function changeImage(newSrc) {
  const mainImage = document.getElementById("main-image");
  mainImage.src = newSrc;
}

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
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");
const quantityInput = document.getElementById("quantity");

// Decrease quantity
decreaseButton.addEventListener("click", () => {
  let currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
  }
});

// Increase quantity
increaseButton.addEventListener("click", () => {
  let currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
});
// Ensure that the function is declared as `async` to use `await` inside
