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

// Hàm chuyển đổi và áp dụng chế độ sáng/tối
function toggleTheme() {
    // Chuyển đổi lớp chế độ tối cho body
    const isDarkMode = document.body.classList.toggle("dark-mode");

    // Cập nhật trạng thái chế độ vào localStorage
    const theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);

    // Cập nhật nội dung nút
    updateToggleText();
}

// Hàm cập nhật nội dung nút dựa trên chế độ hiện tại
function updateToggleText() {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const theme = document.body.classList.contains("dark-mode") ? "Tối" : "Sáng";
    themeToggleBtn.textContent = theme;
}

// Áp dụng trạng thái lưu trong localStorage khi trang tải
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    // Kiểm tra nếu chế độ tối được lưu và kích hoạt nếu có
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Cập nhật nội dung nút theo chế độ
    updateToggleText();
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

// Kiểm tra chế độ lưu trong localStorage khi tải trang
function applySavedMode() {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Gọi hàm applySavedMode để áp dụng chế độ khi tải trang
applySavedMode();

// ----------------------
// Tips chung
// ----------------------
function initTips(tipsArray, contentId, counterId, prevBtnId, nextBtnId, playPauseBtnId) {
    let currentTip = 0;
    let intervalId;

    const contentEl = document.getElementById(contentId);
    const counterEl = document.getElementById(counterId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const playPauseBtn = document.getElementById(playPauseBtnId);

    if (!contentEl || !counterEl || !prevBtn || !nextBtn || !playPauseBtn) return;

    function showTip(index) {
        contentEl.textContent = tipsArray[index];
        counterEl.textContent = `${index + 1}/${tipsArray.length}`;
    }

    function startAutoPlay() {
        intervalId = setInterval(() => {
            currentTip = (currentTip + 1) % tipsArray.length;
            showTip(currentTip);
        }, 3000);
    }

    prevBtn.addEventListener("click", () => {
        currentTip = (currentTip > 0) ? currentTip - 1 : tipsArray.length - 1;
        showTip(currentTip);
    });

    nextBtn.addEventListener("click", () => {
        currentTip = (currentTip + 1) % tipsArray.length;
        showTip(currentTip);
    });

    playPauseBtn.addEventListener("click", () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            playPauseBtn.textContent = "▶";
        } else {
            startAutoPlay();
            playPauseBtn.textContent = "❚❚";
        }
    });

    // Khởi tạo
    showTip(currentTip);
    startAutoPlay();
}

// ----------------------
// Dữ liệu tips
// ----------------------
const homeTips = [
    "Mỗi ngày ăn no có thể nhận được hạt dẻ",
    "Món ăn đã nấu chỉ để được tối đa một ngày theo thời gian thực",
    "Mèo đen thích nhất nước thịt đóng hộp",
    "Muốn biết các vị trí thời trang nhận được bao nhiêu điểm? Nhấn 'Chi tiết' ở Bảng đánh giá để xem",
    "Đồ lấy từ trong tủ lạnh ra mà không nấu chỉ để được tối đa 5 ngày theo thời gian thực"
];

const vvannaChallengeTips = [
    "Mục tiêu phối nhiều bộ, không được mặc trùng lặp.",
    "Có thể vượt ải nhiều lần để hoàn thành dần từng mục tiêu.",
    "Những đồ mặc để vượt ải (trừ tóc) phải nhuộm đúng theo mục tiêu đặt ra và nhuộm tối thiểu một khu đúng theo màu yêu cầu.",
    "Khi chọn màu phải bấm lưu, bấm đúng màu mà không lưu thì mục tiêu màu sắc sẽ không được tính.",
    "Về yêu cầu nhãn thì thường phải dùng ít nhất 3 món đúng nhãn mới được tính",
    "Có 2 nhãn Đồng Phục, đừng tìm nhầm",
    "Nếu không có sẵn đồ đúng nhãn thì vào bộ sưu tập tìm kiếm theo bộ lọc, xem cách nhận, chịu khó dò tìm đồ dễ lấy nhất."
];

// ----------------------
// Khởi tạo tips theo trang
// ----------------------
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tipsContent")) {
        initTips(homeTips, "tipsContent", "tipCounter", "prevBtn", "nextBtn", "playPauseBtn");
    }
    if (document.getElementById("tipsvcContent")) {
        initTips(vvannaChallengeTips, "tipsvcContent", "tipCounter", "prevBtn", "nextBtn", "playPauseBtn");
    }
});


//Nút cuộn nhanh
window.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const scrollBottomBtn = document.getElementById("scrollBottomBtn");

    if (scrollTopBtn && scrollBottomBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        scrollBottomBtn.addEventListener("click", () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        });
    }
});

// ----------------------
// Tìm kiếm trong Thử thách Vvanna
// ----------------------
window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const boxes = document.querySelectorAll(".challenge-box");
  const noResult = document.getElementById("no-result");

  if (searchBar && boxes.length > 0) {
    searchBar.addEventListener("input", () => {
      const query = searchBar.value.toLowerCase().trim();
      let found = false;

      boxes.forEach(box => {
        const number = box.textContent.toLowerCase();
        const text = box.getAttribute("data-text").toLowerCase();

        if (number.includes(query) || text.includes(query)) {
          box.style.display = "flex";
          found = true;
        } else {
          box.style.display = "none";
        }
      });

      noResult.style.display = found ? "none" : "block";
    });
  }
});



