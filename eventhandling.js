
document.addEventListener("DOMContentLoaded", function () {
    const timeButton = document.getElementById("showTimeBtn");
    const timeDisplay = document.getElementById("timeDisplay");

    if (timeButton && timeDisplay) {
        timeButton.addEventListener("click", function () {
            const currentTime = new Date().toLocaleTimeString();
            timeDisplay.textContent = "Current Time: " + currentTime;
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(
        ".navbar-nav .nav-link"
    );

    menuItems.forEach(function (item, index) {
        item.addEventListener("keydown", function (event) {
            let nextIndex;

            if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % menuItems.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (index - 1 + menuItems.length) % menuItems.length;
            } else {
                return;
            }

            event.preventDefault();
            menuItems[nextIndex].focus();
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");

    if (!step1 || !step2) return;

    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const finishBtn = document.getElementById("finishBtn");
    const message = document.getElementById("formMessage");

    // Callback function
    function changeStep(stepNumber, callback) {
        step1.style.display = stepNumber === 1 ? "block" : "none";
        step2.style.display = stepNumber === 2 ? "block" : "none";

        if (callback) {
            callback();
        }
    }

    nextBtn.addEventListener("click", function () {
        const name = document.getElementById("playerName").value.trim();

        if (!name) {
            message.textContent = "Please enter your name.";
            return;
        }

        changeStep(2, function () {
            message.textContent = "Step 2: Enter your email.";
        });
    });

    backBtn.addEventListener("click", function () {
        changeStep(1, function () {
            message.textContent = "Back to Step 1.";
        });
    });

    finishBtn.addEventListener("click", function () {
        const name = document.getElementById("playerName").value.trim();
        const email = document.getElementById("playerEmail");

        if (!email.validity.valid || !email.value.trim()) {
            message.textContent = "Please enter a valid email.";
            return;
        }

        message.textContent = "Thank you, " + name + "!";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("language");
    const heroTitle = document.querySelector(".hero-section h1");

    if (!languageSelect || !heroTitle) return;

    languageSelect.addEventListener("change", function () {
        switch (languageSelect.value) {
            case "EN":
                heroTitle.textContent = "WELCOME TO FORTGAME ASTANA";
                break;

            case "RU":
                heroTitle.textContent = "ДОБРО ПОЖАЛОВАТЬ В FORTGAME ASTANA";
                break;

            case "KZ":
                heroTitle.textContent = "FORTGAME ASTANA-ҒА ҚОШ КЕЛДІҢІЗ";
                break;

            default:
                heroTitle.textContent = "WELCOME TO FORTGAME ASTANA";
        }
    });
});
