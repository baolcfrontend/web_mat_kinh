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
        // JavaScript (optional, if you want to control the scrolling behavior) 
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

        // Add event listeners to each button only
        buttons.forEach(button => {
            button.addEventListener('mouseenter', pauseScroll);  // Pause on button hover
            button.addEventListener('mouseleave', resumeScroll); // Resume when leaving button
        });

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