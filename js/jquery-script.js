/* ==========================================================
   jquery-script.js — Assignment 6. jQuery
   Task 0. Setup  +  Part 1. jQuery Search (Tasks 1-3)

   Loaded in <head> right after jQuery from the CDN.
   Everything runs inside $(document).ready(), so the code waits
   until the HTML is parsed even though the file is in <head>.
   Each task first checks that its elements exist on the page,
   so the same file can be included on every page.
   ========================================================== */

$(document).ready(function () {
    "use strict";

    /* ---------- Task 0. Setup ---------- */
    console.log("jQuery is ready!");

    /* helpers shared by Tasks 2 and 3 */

    // makes a string safe to put inside a RegExp ("C++" -> "C\+\+")
    function escapeRegExp(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // makes a string safe to put inside .html() ("<b>" -> "&lt;b&gt;")
    function escapeHtml(text) {
        return $("<div>").text(text).html();
    }

    // returns HTML where every match of the query is wrapped in <mark>
    // split() with a capture group keeps the matched parts in the array:
    // "Dota 2".split(/(ot)/i) -> ["D", "ot", "a 2"] — odd indexes are matches
    function markMatches(text, query, className) {
        if (!query) return escapeHtml(text);
        const regex = new RegExp("(" + escapeRegExp(query) + ")", "gi");
        return text.split(regex).map(function (part, index) {
            return index % 2 === 1
                ? '<mark class="' + className + '">' + escapeHtml(part) + "</mark>"
                : escapeHtml(part);
        }).join("");
    }


    /* ==========================================================
       Task 1. Real-time Search and Live Filter  (rooms.html)
       Filters the Games Library cards while the user types.
       ========================================================== */
    const $gameSearch = $("#gameSearch");
    const $games = $(".game-item");

    function filterGames() {
        const query = String($gameSearch.val()).trim().toLowerCase();

        // .filter() keeps only the cards whose text contains the query
        const $matched = $games.filter(function () {
            const haystack = ($(this).data("title") + " " +
                              $(this).data("genre") + " " +
                              $(this).data("platform")).toLowerCase();
            return haystack.indexOf(query) !== -1;
        });

        $games.not($matched).hide();
        $matched.fadeIn(150);

        $("#gameCount").text(query
            ? "Found " + $matched.length + " of " + $games.length + " games"
            : "Showing all " + $games.length + " games");
        $("#gameEmpty").toggleClass("d-none", $matched.length > 0);
        $("#gameClear").toggleClass("d-none", query === "");
    }

    if ($gameSearch.length) {
        // "keyup" fires after each key; "input" also catches paste and clearing with the mouse
        $gameSearch.on("keyup input", filterGames);

        $("#gameClear").on("click", function () {
            $gameSearch.val("").trigger("input").trigger("focus");
        });

        filterGames();   // sets the initial counter text
    }


    /* ==========================================================
       Task 2. Autocomplete Search Suggestions  (rooms.html)
       A dropdown under the same search field. Arrow keys move
       through the list, Enter picks, Esc closes.
       ========================================================== */
    const $suggestions = $("#gameSuggestions");
    const MAX_SUGGESTIONS = 6;
    let activeIndex = -1;

    // suggestions are read from the cards, so the list is never out of date:
    // every title, plus every genre and platform once (no duplicates)
    const suggestionPool = [];
    function addToPool(value, kind) {
        const exists = suggestionPool.some(function (s) { return s.value === value; });
        if (!exists) suggestionPool.push({ value: value, kind: kind });
    }
    $games.each(function () { addToPool(String($(this).data("title")), "Game"); });
    $games.each(function () { addToPool(String($(this).data("genre")), "Genre"); });
    $games.each(function () {
        String($(this).data("platform")).split(" / ").forEach(function (p) { addToPool(p, "Platform"); });
    });

    function closeSuggestions() {
        $suggestions.empty().addClass("d-none");
        $gameSearch.attr("aria-expanded", "false").removeAttr("aria-activedescendant");
        activeIndex = -1;
    }

    function showSuggestions() {
        const query = String($gameSearch.val()).trim();
        const lower = query.toLowerCase();

        if (!query) { closeSuggestions(); return; }

        // titles that START with the query come first, then titles that only contain it
        const startsWith = suggestionPool.filter(function (s) { return s.value.toLowerCase().indexOf(lower) === 0; });
        const contains = suggestionPool.filter(function (s) { return s.value.toLowerCase().indexOf(lower) > 0; });
        const results = startsWith.concat(contains).slice(0, MAX_SUGGESTIONS);

        $suggestions.empty();
        activeIndex = -1;

        if (!results.length) {
            $suggestions.append('<li class="suggestion-empty" role="option" aria-disabled="true">No suggestions</li>');
        }

        $.each(results, function (i, item) {
            $("<li>", {
                "class": "suggestion",
                id: "suggestion-" + i,
                role: "option",
                "aria-selected": "false",
                "data-value": item.value
            }).html('<span>' + markMatches(item.value, query, "suggestion-match") + '</span>' +
                    '<span class="suggestion-kind">' + item.kind + '</span>')
              .appendTo($suggestions);
        });

        $suggestions.removeClass("d-none");
        $gameSearch.attr("aria-expanded", "true");
    }

    function setActive(index) {
        const $items = $suggestions.find(".suggestion");
        if (!$items.length) return;

        // wrap around: past the last item -> back to the first
        activeIndex = (index + $items.length) % $items.length;
        $items.removeClass("is-active").attr("aria-selected", "false");
        const $current = $items.eq(activeIndex).addClass("is-active").attr("aria-selected", "true");
        $gameSearch.attr("aria-activedescendant", $current.attr("id"));
    }

    function chooseSuggestion(title) {
        $gameSearch.val(title);
        filterGames();          // Task 1 filter shows the chosen game
        closeSuggestions();
    }

    if ($gameSearch.length && $suggestions.length) {
        $gameSearch.on("input", showSuggestions);

        $gameSearch.on("keydown", function (event) {
            if ($suggestions.hasClass("d-none")) {
                if (event.key === "ArrowDown") showSuggestions();
                return;
            }
            if (event.key === "ArrowDown") { event.preventDefault(); setActive(activeIndex + 1); }
            else if (event.key === "ArrowUp") { event.preventDefault(); setActive(activeIndex - 1); }
            else if (event.key === "Enter") {
                event.preventDefault();
                const $current = $suggestions.find(".suggestion").eq(activeIndex);
                if (activeIndex >= 0 && $current.length) chooseSuggestion($current.data("value"));
                else closeSuggestions();
            }
            else if (event.key === "Escape") closeSuggestions();
        });

        // event delegation: the <li> items are created later, so the handler sits on the <ul>
        // "mousedown" (not "click") runs before the input loses focus
        $suggestions.on("mousedown", ".suggestion", function (event) {
            event.preventDefault();
            chooseSuggestion($(this).data("value"));
        });
        $suggestions.on("mouseenter", ".suggestion", function () {
            setActive($(this).index());
        });

        // click anywhere outside the search box closes the dropdown
        $(document).on("click", function (event) {
            if (!$(event.target).closest(".search-box").length) closeSuggestions();
        });
    }


    /* ==========================================================
       Task 3. Search Highlighting  (contact.html — FAQ)
       Highlights every match in the questions and answers,
       opens the answers that contain a match and dims the rest.
       ========================================================== */
    const $faqSearch = $("#faqSearch");
    const $faqItems = $(".faq-item");
    // the question text <span> and the answer paragraph of every FAQ item
    const $faqTexts = $faqItems.find(".faq-question > span:first-child, .faq-answer-text");

    // remember the original text once, so every new search starts from clean text
    $faqTexts.each(function () {
        $(this).data("original", $(this).text());
    });

    function setFaqOpen($item, open) {
        const $button = $item.find(".faq-question");
        const isOpen = $button.attr("aria-expanded") === "true";
        // reuse the accordion from accordion.js: a click toggles the answer
        if (isOpen !== open) $button.trigger("click");
    }

    function highlightFaq() {
        const query = String($faqSearch.val()).trim();
        let total = 0;

        $faqItems.each(function () {
            const $item = $(this);
            let itemMatches = 0;

            $item.find($faqTexts).each(function () {
                const original = $(this).data("original");
                if (query) {
                    const found = original.match(new RegExp(escapeRegExp(query), "gi"));
                    itemMatches += found ? found.length : 0;
                }
                // .html() puts the text back with <mark> around each match
                $(this).html(markMatches(original, query, "search-highlight"));
            });

            total += itemMatches;
            $item.toggleClass("faq-dimmed", query !== "" && itemMatches === 0);

            if (query && itemMatches > 0) {
                if ($item.find(".faq-question").attr("aria-expanded") !== "true") {
                    $item.data("openedBySearch", true);
                    setFaqOpen($item, true);
                }
            } else if ($item.data("openedBySearch")) {
                // close only the answers the search opened, not the ones the user opened
                $item.removeData("openedBySearch");
                setFaqOpen($item, false);
            }
        });

        // <mark> can change the answer height a little; accordion.js recalculates on resize
        window.dispatchEvent(new Event("resize"));

        const $status = $("#faqCount");
        if (!query) $status.text("");
        else if (total === 0) $status.text('No matches for "' + query + '"');
        else $status.text(total + (total === 1 ? " match" : " matches") + ' for "' + query + '"');

        $("#faqClear").toggleClass("d-none", query === "");
    }

    if ($faqSearch.length) {
        $faqSearch.on("keyup input", highlightFaq);
        $("#faqClear").on("click", function () {
            $faqSearch.val("").trigger("input").trigger("focus");
        });
    }
});
