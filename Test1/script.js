document.addEventListener("DOMContentLoaded", () => {
    const movieSelect = document.getElementById("movie");
    const seats = document.querySelectorAll(".seat:not(.booked)");
    const selectedMovie = document.getElementById("selected-movie");
    const selectedSeats = document.getElementById("selected-seats");
    const totalPrice = document.getElementById("total-price");
    const confirmButton = document.getElementById("confirm-button");
    const paymentMethod = document.getElementById("payment-method");
    const payButton = document.getElementById("pay-button");
    const creditCardInfo = document.getElementById("credit-card-info");

    let selectedSeatList = [];

    seats.forEach(seat => {
        seat.addEventListener("click", () => {
            const seatNumber = seat.getAttribute("data-seat");
            
            if (selectedSeatList.includes(seatNumber)) {
                selectedSeatList = selectedSeatList.filter(s => s !== seatNumber);
                seat.classList.remove("selected");
            } else {
                selectedSeatList.push(seatNumber);
                seat.classList.add("selected");
            }
            
            updateSummary();
        });
    });

    function updateSummary() {
        const movieText = movieSelect.options[movieSelect.selectedIndex].text;
        const moviePrice = parseInt(movieSelect.value);
        selectedMovie.textContent = movieText;
        selectedSeats.textContent = selectedSeatList.join(", ") || "-";
        totalPrice.textContent = selectedSeatList.length * moviePrice;
    }

    movieSelect.addEventListener("change", updateSummary);

    confirmButton.addEventListener("click", () => {
        if (selectedSeatList.length === 0) {
            alert("กรุณาเลือกที่นั่งก่อนทำการจอง!");
            return;
        }

        // ✅ แจ้งเตือนว่าจองแล้ว
        alert(` คุณได้ทำการจองสำเร็จแล้ว!\n\n หนัง: ${selectedMovie.textContent}\n ที่นั่ง: ${selectedSeats.textContent}\n ราคารวม: ${totalPrice.textContent} บาท`);
    });

    paymentMethod.addEventListener("change", () => {
        if (paymentMethod.value === "credit-card") {
            creditCardInfo.style.display = "block";
        } else {
            creditCardInfo.style.display = "none";
        }
    });

    payButton.addEventListener("click", () => {
        if (selectedSeatList.length === 0) {
            alert("กรุณาเลือกที่นั่งก่อนทำการชำระเงิน!");
            return;
        }

        let paymentStatus = "ชำระเงินแล้ว";
        if (paymentMethod.value === "credit-card") {
            const cardNumber = document.getElementById("card-number").value;
            const cardName = document.getElementById("card-name").value;
            const cardExpiry = document.getElementById("card-expiry").value;
            const cardCvv = document.getElementById("card-cvv").value;

            if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                alert("กรุณากรอกข้อมูลบัตรเครดิตให้ครบถ้วน!");
                return;
            }
        } else if (paymentMethod.value === "bank-transfer") {
            paymentStatus = " Waiting for the money transfer verification";
        }

        alert(`ชำระเงินเรียบร้อยแล้ว!!\n\nStatus: ${paymentStatus}`);

        //  แสดง PDF ทันทีหลังชำระเงิน
        generatePDF(paymentStatus);
    });

    function generatePDF(paymentStatus) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // ตั้งค่าฟอนต์
        doc.setFontSize(18);

        // แสดงข้อมูลหลัก
        doc.text(` NameMovie: ${selectedMovie.textContent}`, 20, 30);
        doc.text(` Seats    : ${selectedSeats.textContent}`, 20, 50);
        doc.text(` Price    : ${totalPrice.textContent} Baht`, 20, 70);
        doc.text(` Date     : ${new Date().toLocaleDateString()}`, 20, 90);
        doc.text(` Time     : ${new Date().toLocaleTimeString()}`, 20, 110);
        doc.text(` Payment status: ${paymentStatus}`, 20, 150);

        // ดาวน์โหลดไฟล์ PDF
        doc.save("booking-receipt.pdf");
    }
});
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".movie").forEach(movie => {
            movie.addEventListener("click", function () {
                window.location.href = "index.html";
            });
        });
    });
