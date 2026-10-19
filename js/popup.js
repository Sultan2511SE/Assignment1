/* Task 3. Popup subscription form (index.html) */
(function () {
    "use strict";

    const overlay = document.getElementById("subscribePopup");
    const openButton = document.getElementById("openSubscribe");
    if (!overlay || !openButton) return;

    const closeButton = overlay.querySelector(".popup-close");
    const form = document.getElementById("subscribeForm");
    const nameInput = document.getElementById("subName");
    const emailInput = document.getElementById("subEmail");
    const message = document.getElementById("subSuccess");
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function openPopup() {
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("popup-open");
        // небольшая пауза: пока идёт появление, поле ещё невидимо и фокус не встанет
        setTimeout(function () { nameInput.focus(); }, 60);
    }

    function closePopup() {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("popup-open");
        openButton.focus();
    }

    function setError(input, text) {
        input.classList.toggle("is-invalid", Boolean(text));
        document.getElementById(input.id + "Error").textContent = text;
    }

    openButton.addEventListener("click", openPopup);
    closeButton.addEventListener("click", closePopup);

    // клик по тёмному фону (но не по самому окну) закрывает попап
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) closePopup();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && overlay.classList.contains("is-open")) closePopup();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const nameOk = nameInput.value.trim().length >= 2;
        const emailOk = EMAIL_RE.test(emailInput.value.trim());
        setError(nameInput, nameOk ? "" : "Please enter your name (2+ characters).");
        setError(emailInput, emailOk ? "" : "Enter a valid email, e.g. name@example.com.");
        if (!nameOk || !emailOk) return;

        message.classList.remove("d-none");
        form.reset();
        setTimeout(function () {
            message.classList.add("d-none");
            if (overlay.classList.contains("is-open")) closePopup();
        }, 1800);
    });
})();
