$(function () {

    /* Task 7. Toast */
    const $box = $('<div id="toastContainer">').appendTo("body");

    window.showToast = function (msg, type = "success") {
        $('<div class="toast-msg">')
            .addClass("toast-" + type)
            .text(msg)
            .hide().appendTo($box)
            .slideDown(200).delay(3000).fadeOut(400, function () { $(this).remove(); });
    };

    $(".add-to-cart").on("click", function () {
        showToast($(this).data("item") + " added to cart");
    });
    $("#createAccountForm").on("submit", () => showToast("Form submitted"));
    $("#subscribeForm").on("submit", () => showToast("Subscribed to news!"));

    /* Task 8. Copy to Clipboard */
    $(".copy-btn").on("click", function () {
        const $b = $(this);
        navigator.clipboard.writeText($b.data("copy")).then(() => {
            $b.addClass("is-copied").find(".copy-icon").text("✓");
            $b.find(".copy-tip").text("Copied to clipboard!").fadeIn(150);
            setTimeout(() => {
                $b.removeClass("is-copied").find(".copy-icon").text("⧉");
                $b.find(".copy-tip").fadeOut(200);
            }, 1800);
        });
    });

    /* Task 9. Image Lazy Loading */
    const $lazy = $("img.lazy");

    function lazyLoad() {
        const bottom = $(window).scrollTop() + $(window).height() + 150;
        $lazy.filter("[data-src]").each(function () {
            if ($(this).offset().top < bottom) {
                $(this).attr("src", $(this).data("src")).removeAttr("data-src").addClass("is-loaded");
            }
        });
    }
    $(window).on("scroll resize", lazyLoad);
    lazyLoad();
});