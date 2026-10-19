(function () {
    "use strict";

    const button = document.getElementById("bgToggle");
    if (!button) return;

    const colors = ["#0b0b16", "#1a1033", "#0d2438", "#0f2a1f", "#33121c", "#2b2410"];
    let index = 0;

    document.body.style.transition = "background-color 0.6s ease";

    button.addEventListener("click", function () {
        index = (index + 1) % colors.length;
        document.body.style.backgroundColor = colors[index];
    });
})();