/* ==========================================================
   theme.js — Day / Night theme switch (every page)
   Assignment 5 · Part 1: Dynamic Style Changes
   - The theme is a class on <html>: "theme-day".
   - All colours in style.css are CSS variables; interactive.css
     gives them light values for html.theme-day.
   - This file is loaded in <head> without defer, so the saved
     theme is applied before the page is drawn (no flash).
   ========================================================== */
(function () {
    "use strict";

    const STORAGE_KEY = "fortgame-theme";
    const root = document.documentElement;

    /* localStorage can throw in private mode, so it is wrapped in try/catch */
    function readSavedTheme() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (error) { return null; }
    }

    function saveTheme(value) {
        try { localStorage.setItem(STORAGE_KEY, value); } catch (error) { /* not critical */ }
    }

    let theme = readSavedTheme() === "day" ? "day" : "night";
    root.classList.toggle("theme-day", theme === "day");      // runs immediately

    /* icon and label show what the button will switch TO */
    function updateButton(button) {
        const isDay = theme === "day";
        const label = isDay ? "Switch to night theme" : "Switch to day theme";
        button.querySelector(".tool-icon").textContent = isDay ? "🌙" : "☀️";
        button.setAttribute("aria-pressed", String(isDay));
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
    }

    function toggleTheme(button) {
        theme = theme === "day" ? "night" : "day";
        root.classList.toggle("theme-day", theme === "day");

        /* the "Change background" button (background.js) sets an inline colour;
           clear it so the new theme's background is visible */
        document.body.style.backgroundColor = "";

        saveTheme(theme);
        updateButton(button);
    }

    /* the button exists only after the HTML has been parsed */
    document.addEventListener("DOMContentLoaded", function () {
        const button = document.getElementById("themeToggle");
        if (!button) return;
        updateButton(button);
        button.addEventListener("click", function () { toggleTheme(button); });
    });
})();
