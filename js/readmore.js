/* ==========================================================
   readmore.js — "Read more" button (about.html)
   Assignment 5 · Part 1: Manipulating Attributes
   Toggles the visibility of extra content with style.display
   and changes the button text with textContent.
   ========================================================== */
(function () {
    "use strict";

    const button = document.getElementById("readMoreBtn");
    const extraContent = document.getElementById("moreContent");
    if (!button || !extraContent) return;

    /* hidden by JavaScript, so without JS the text is still readable */
    extraContent.style.display = "none";

    button.addEventListener("click", function () {
        const isHidden = extraContent.style.display === "none";

        extraContent.style.display = isHidden ? "block" : "none";
        button.textContent = isHidden ? "Show less" : "Read more";
        button.setAttribute("aria-expanded", String(isHidden));
    });
})();
