document.getElementById("homepage").addEventListener("click", function() {
    window.location.href = "index.html"; // Chuyển hướng đến URL
});

// Điều chỉnh căn lề của dropdown dựa trên vị trí
function adjustDropdownAlignment(dropdown) {
    const rect = dropdown.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    // Xóa các lớp căn chỉnh cũ
    dropdown.classList.remove("align-left", "align-center", "align-right");

    // Kiểm tra và thêm lớp phù hợp
    if (rect.right > screenWidth) {
        dropdown.classList.add("align-right");
    } else if (rect.left < 0) {
        dropdown.classList.add("align-left");
    } else {
        dropdown.classList.add("align-center");
    }
}