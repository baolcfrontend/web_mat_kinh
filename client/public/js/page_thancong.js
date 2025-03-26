// Hiệu ứng hiện thông báo dần dần
window.onload = function() {
    const successMessage = document.querySelector('.success-message');
    
    // Chờ 0.5s sau khi trang tải xong, cho thông báo xuất hiện dần
    setTimeout(() => {
        successMessage.classList.add('show');
    }, 500);
    
    // Hiệu ứng nút khi hover và click
    const buttons = document.querySelectorAll('.action-buttons a');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });
};
