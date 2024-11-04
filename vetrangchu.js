const homeButton = document.getElementById("homepage");

homeButton.addEventListener("click", function() {
    window.location.href = "https://inforgamepage.github.io/lifemakeover/trangchu.html";
});

homeButton.addEventListener("touchstart", function() {
    window.location.href = "https://inforgamepage.github.io/lifemakeover/trangchu.html";
});



function searchQuestions() {
    // Lấy giá trị tìm kiếm từ ô input
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    const questions = document.querySelectorAll("#questionsContainer p");
    const questionsContainer = document.getElementById("questionsContainer");

    // Tạo một mảng để lưu trữ các câu hỏi tìm thấy
    const foundQuestions = [];

    // Lặp qua tất cả các câu hỏi và hiển thị hoặc ẩn
    questions.forEach(question => {
        const questionText = question.textContent.toLowerCase();
        if (questionText.includes(searchTerm)) {
            foundQuestions.push(question); // Thêm câu hỏi vào mảng
        }
    });

    // Nếu tìm thấy câu hỏi, di chuyển chúng lên trên cùng
    if (foundQuestions.length > 0) {
        foundQuestions.forEach(question => {
            questionsContainer.prepend(question); // Di chuyển câu hỏi lên đầu
        });
    }

    // Reset lại hiển thị nếu ô tìm kiếm trống
    if (searchTerm === "") {
        questions.forEach(question => {
            question.style.display = "block"; // Hiển thị tất cả câu hỏi
        });
    } else {
        // Ẩn các câu hỏi không tìm thấy
        questions.forEach(question => {
            const questionText = question.textContent.toLowerCase();
            question.style.display = foundQuestions.includes(question) ? "block" : "none";
        });
    }
}
