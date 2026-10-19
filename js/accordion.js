/* Task 2. Accordion (contact.html) */
(function () {
    "use strict";

    const questions = document.querySelectorAll(".faq-question");
    if (!questions.length) return;

    function setOpen(button, open) {
        const answer = document.getElementById(button.getAttribute("aria-controls"));
        button.setAttribute("aria-expanded", String(open));
        button.closest(".faq-item").classList.toggle("is-open", open);
        // плавность даёт CSS transition на max-height: 0 <-> реальная высота ответа
        answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0px";
    }

    questions.forEach(function (button) {
        button.addEventListener("click", function () {
            setOpen(button, button.getAttribute("aria-expanded") !== "true");
        });
    });

    // если изменилась ширина окна, высота открытых ответов меняется
    window.addEventListener("resize", function () {
        questions.forEach(function (button) {
            if (button.getAttribute("aria-expanded") === "true") setOpen(button, true);
        });
    });
})();
