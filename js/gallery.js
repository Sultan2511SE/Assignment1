/* ==========================================================
   gallery.js — image gallery with thumbnails (rooms.html)
   Assignment 5 · Part 1: Manipulating Attributes
   When a thumbnail is clicked, the src and alt of the large
   image are changed to the thumbnail's picture, and the
   caption is updated with textContent.
   ========================================================== */
(function () {
    "use strict";

    const mainImage = document.getElementById("galleryImage");
    const title = document.getElementById("galleryTitle");
    const text = document.getElementById("galleryText");
    const counter = document.getElementById("galleryCounter");
    const thumbnails = document.querySelectorAll(".gallery-thumb");
    if (!mainImage || !thumbnails.length) return;

    function showPhoto(thumbnail, index) {
        const thumbImage = thumbnail.querySelector("img");

        /* the attribute changes */
        mainImage.setAttribute("src", thumbImage.getAttribute("src"));
        mainImage.setAttribute("alt", thumbnail.dataset.title);

        title.textContent = thumbnail.dataset.title;
        text.textContent = thumbnail.dataset.text;
        counter.textContent = (index + 1) + " / " + thumbnails.length;

        /* highlight the selected thumbnail */
        thumbnails.forEach(function (thumb) {
            thumb.classList.remove("is-active");
            thumb.removeAttribute("aria-current");
        });
        thumbnail.classList.add("is-active");
        thumbnail.setAttribute("aria-current", "true");
    }

    thumbnails.forEach(function (thumbnail, index) {
        thumbnail.addEventListener("click", function () {
            showPhoto(thumbnail, index);
        });
    });

    /* "View Gallery" buttons on the room cards open the matching photo */
    document.querySelectorAll("[data-gallery-index]").forEach(function (link) {
        link.addEventListener("click", function () {
            const index = Number(link.dataset.galleryIndex);
            showPhoto(thumbnails[index], index);
        });
    });
})();
