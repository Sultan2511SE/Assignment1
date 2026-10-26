/* ==========================================================
   background.js — "Change background" button (index, contact)
   Assignment 5 · Part 1: Dynamic Style Changes
   Changes document.body.style.backgroundColor directly.
   Uses a light palette when the Day theme is on (theme.js).
   ========================================================== */
(function () {
    "use strict";

    const button = document.getElementById("bgToggle");
    if (!button) return;

    const nightColors = ["#0b0b16", "#1a1033", "#0d2438", "#0f2a1f", "#33121c", "#2b2410"];
    const dayColors = ["#f4f5fb", "#efe9ff", "#e3f6fb", "#e6f6ec", "#fbe9ee", "#fbf3df"];
    let index = 0;

    document.body.style.transition = "background-color 0.6s ease";

    button.addEventListener("click", function () {
        const isDay = document.documentElement.classList.contains("theme-day");
        const colors = isDay ? dayColors : nightColors;
        index = (index + 1) % colors.length;
        document.body.style.backgroundColor = colors[index];
    });
})();
