/* ==========================================================
   rating.js — 5-star rating on every room card (rooms.html)
   Assignment 5 · Part 1: Selecting and Manipulating HTML Elements
   - document.querySelectorAll selects the rating blocks and stars
   - the clicked star and the ones before it change colour
     (class "is-active", colour defined in interactive.css)
   - the message under the stars is updated with textContent
   ========================================================== */
(function () {
    "use strict";

    const ratingBlocks = document.querySelectorAll(".rating");

    ratingBlocks.forEach(function (block) {
        const stars = block.querySelectorAll(".star");
        const message = block.querySelector(".rating-message");
        const roomName = block.dataset.roomName;

        stars.forEach(function (star, index) {
            star.addEventListener("click", function () {
                const rating = index + 1;

                /* colour every star up to the clicked one */
                stars.forEach(function (otherStar, otherIndex) {
                    otherStar.classList.toggle("is-active", otherIndex < rating);
                    otherStar.setAttribute("aria-pressed", String(otherIndex === index));
                });

                /* change the text under the stars */
                message.textContent = "You rated " + roomName + " " + rating + " out of 5. Thank you!";
            });
        });
    });
})();
