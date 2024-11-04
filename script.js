// Hàm mở menu thả xuống
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle("show");
    closeOtherDropdowns(id);
}

// Đóng các menu khác khi một menu được mở
function closeOtherDropdowns(openDropdownId) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== openDropdownId) {
            dropdowns[i].classList.remove("show");
        }
    }
}

// Thêm sự kiện cho cả 'click' và 'touchstart'
document.querySelectorAll(".dropdown-btn").forEach((button) => {
    // Xử lý sự kiện 'touchstart' cho thiết bị di động
    button.addEventListener("touchstart", function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định
        toggleDropdown(this.nextElementSibling.id); // Hiển thị danh sách
    });

    // Xử lý sự kiện 'click' cho thiết bị không cảm ứng
    button.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định
        toggleDropdown(this.nextElementSibling.id);
    });
});

// Đóng menu khi nhấp ra ngoài
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-content')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove("show");
        }
    }
};

// Điều chỉnh chiều cao của dropdown khi khung nhìn thay đổi
function adjustDropdownHeight() {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    const maxDropdownHeight = window.innerHeight * 0.5; // Chiều cao tối đa là 50% khung nhìn

    dropdowns.forEach(dropdown => {
        dropdown.style.maxHeight = `${maxDropdownHeight}px`;
        dropdown.style.overflowY = "auto"; // Cho phép cuộn nếu vượt quá chiều cao tối đa
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = "Tối"; // Thay đổi chữ thành "Tối"
    } else {
        themeToggleBtn.textContent = "Sáng"; // Trở lại chữ "Sáng"
    }
}

const tips = [
 "Mỗi ngày ăn no có thể nhận được hạt dẻ",
 "Món ăn đã nấu chỉ để được tối đa một ngày theo thời gian thực",
 "Mèo đen thích nhất nước thịt đóng hộp",
 "Muốn biết các vị trí thời trang nhận được bao nhiêu điểm? Nhấn 'Chi tiết' ở Bảng đánh giá để xem",
 "Đồ lấy từ trong tủ lạnh ra mà không nấu chỉ để được tối đa 5 ngày theo thời gian thực"
];

let currentTipIndex = 0;
let intervalId;
const tipsContent = document
 .getElementById("tipsContent");
const playPauseBtn = document
 .getElementById("playPauseBtn");
const tipCounter = document.getElementById("tipCounter"); 

function showTip(index) {
 tipsContent.textContent = tips[index];
 updateCounter();
}

function updateCounter() {
    tipCounter.textContent = `Mẹo ${currentTipIndex + 1}/${tips.length}`;
}

document.getElementById("prevBtn")
 .addEventListener("click", () => {
  currentTipIndex = (currentTipIndex >
    0) ? currentTipIndex - 1 : tips
   .length - 1;
  showTip(currentTipIndex);
 });

document.getElementById("nextBtn")
 .addEventListener("click", () => {
  currentTipIndex = (currentTipIndex +
   1) % tips.length;
  showTip(currentTipIndex);
 });

// Bắt đầu chạy tự động khi trang được tải
function startAutoPlay() {
 intervalId = setInterval(() => {
  currentTipIndex = (currentTipIndex +
   1) % tips.length;
  showTip(currentTipIndex);
 }, 3000); // 3 giây
}

// Dừng hoặc chạy tự động khi bấm nút
playPauseBtn.addEventListener("click",
 () => {
  if (intervalId) {
   clearInterval(intervalId);
   intervalId = null;
   playPauseBtn.textContent =
    "▶"; // Chạy
  } else {
   startAutoPlay();
   playPauseBtn.textContent =
    "❚❚"; // Dừng
  }
 });

// Khởi tạo tip đầu tiên và bắt đầu tự động
showTip(currentTipIndex);
startAutoPlay();
