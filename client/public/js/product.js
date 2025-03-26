// JavaScript to handle checkbox filtering or other events if needed
document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('click', function () {
        alert("Liên hệ ngay!");
    });
});

// Toggle the visibility of the extended color options
// Toggle the visibility of the extended color options
const toggleButton = document.getElementById('toggleMore');
const moreOptions = document.querySelector('.more-options');

toggleButton.addEventListener('click', function () {
    if (moreOptions.style.display === 'none' || moreOptions.style.display === '') {
        moreOptions.style.display = 'block';
        toggleButton.innerHTML = 'Thu gọn'; // Change button text to 'Thu gọn'
    } else {
        moreOptions.style.display = 'none';
        toggleButton.innerHTML = 'Xem Thêm'; // Change button text to 'Xem Thêm'
    }
});

// Add additional JS logic for carousel or other interactive features if needed

// Responsive Carousel logic
let currentIndex = 0;
function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const products = document.querySelectorAll('.product');
    const productWidth = products[0].offsetWidth + 15; // product width + gap
    const visibleItems = Math.floor(document.querySelector('.carousel-container').offsetWidth / productWidth);
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

// JavaScript to handle social scroll pause/resume on button hover
const scrollContainer = document.querySelector('.social-scroll');
const buttons = document.querySelectorAll('.social-item button');

// Function to stop the animation
function pauseScroll() {
    scrollContainer.style.animationPlayState = 'paused';
}

// Function to resume the animation
function resumeScroll() {
    scrollContainer.style.animationPlayState = 'running';
}

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('mouseenter', pauseScroll);  // Pause on button hover
    button.addEventListener('mouseleave', resumeScroll); // Resume when leaving button
});

// Make sure the carousel adapts to window resizing
window.addEventListener('resize', function() {
    // Update the carousel movement logic on resize
    const carousel = document.querySelector('.carousel');
    const products = document.querySelectorAll('.product');
    const productWidth = products[0].offsetWidth + 15; // product width + gap
    const visibleItems = Math.floor(document.querySelector('.carousel-container').offsetWidth / productWidth);
    const maxIndex = products.length - visibleItems;

    // Ensure the carousel position remains valid
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    carousel.style.transform = `translateX(-${currentIndex * productWidth}px)`;
});
