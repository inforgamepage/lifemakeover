// ---------------- Dropdown Menu ----------------
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle("show");
    closeOtherDropdowns(id);
}

function closeOtherDropdowns(openDropdownId) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== openDropdownId) {
            dropdowns[i].classList.remove("show");
        }
    }
}

document.querySelectorAll(".dropdown-btn").forEach((button) => {
    button.addEventListener("touchstart", function (event) {
        event.preventDefault();
        toggleDropdown(this.nextElementSibling.id);
    });
    button.addEventListener("click", function (event) {
        event.preventDefault();
        toggleDropdown(this.nextElementSibling.id);
    });
});

window.onclick = function (event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-content')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove("show");
        }
    }
};

function adjustDropdownHeight() {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    const maxDropdownHeight = window.innerHeight * 0.5;
    dropdowns.forEach(dropdown => {
        dropdown.style.maxHeight = `${maxDropdownHeight}px`;
        dropdown.style.overflowY = "auto";
    });
}

// ---------------- Theme ----------------
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateToggleText();
}

function updateToggleText() {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const theme = document.body.classList.contains("dark-mode") ? "Tối" : "Sáng";
    themeToggleBtn.textContent = theme;
}

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.body.classList.add("dark-mode");
    updateToggleText();
});

// ---------------- Dropdown Alignment ----------------
function adjustDropdownAlignment(dropdown) {
    const rect = dropdown.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    dropdown.classList.remove("align-left", "align-center", "align-right");
    if (rect.right > screenWidth) dropdown.classList.add("align-right");
    else if (rect.left < 0) dropdown.classList.add("align-left");
    else dropdown.classList.add("align-center");
}

// ---------------- Tip Rotation ----------------
const tips = [
 "Mỗi ngày ăn no có thể nhận được hạt dẻ",
 "Món ăn đã nấu chỉ để được tối đa một ngày theo thời gian thực",
 "Mèo đen thích nhất nước thịt đóng hộp",
 "Muốn biết các vị trí thời trang nhận được bao nhiêu điểm? Nhấn 'Chi tiết' ở Bảng đánh giá để xem",
 "Đồ lấy từ trong tủ lạnh ra mà không nấu chỉ để được tối đa 5 ngày theo thời gian thực"
];

let currentTipIndex = 0;
let intervalId;
const tipsContent = document.getElementById("tipsContent");
const playPauseBtn = document.getElementById("playPauseBtn");
const tipCounter = document.getElementById("tipCounter"); 

function showTip(index) {
    tipsContent.textContent = tips[index];
    updateCounter();
}

function updateCounter() {
    tipCounter.textContent = `${currentTipIndex + 1}/${tips.length}`;
}

document.getElementById("prevBtn").addEventListener("click", () => {
    currentTipIndex = (currentTipIndex > 0) ? currentTipIndex - 1 : tips.length - 1;
    showTip(currentTipIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    showTip(currentTipIndex);
});

function startAutoPlay() {
    intervalId = setInterval(() => {
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        showTip(currentTipIndex);
    }, 3000);
}

playPauseBtn.addEventListener("click", () => {
    if(intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        playPauseBtn.textContent = "▶";
    } else {
        startAutoPlay();
        playPauseBtn.textContent = "❚❚";
    }
});

showTip(currentTipIndex);
startAutoPlay();

// ---------------- Scroll Buttons ----------------
document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const scrollBottomBtn = document.getElementById("scrollBottomBtn");

    if(scrollTopBtn || scrollBottomBtn){
        function getScrollContainer() {
            return document.querySelector(".main-container") || window;
        }

        function scrollToTop() {
            const container = getScrollContainer();
            if(container === window) window.scrollTo({ top: 0, behavior: "smooth" });
            else container.scrollTo({ top: 0, behavior: "smooth" });
        }

        function scrollToBottom() {
            const container = getScrollContainer();
            if(container === window) window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            else container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        }

        if(scrollTopBtn) scrollTopBtn.addEventListener("click", scrollToTop);
        if(scrollBottomBtn) scrollBottomBtn.addEventListener("click", scrollToBottom);
    }
});
