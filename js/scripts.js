var typed = new Typed('.typed', {
    stringsElement: '.typed-strings',
    typeSpeed: 35,
    startDelay: 750,
});

function showOverlays() {
    $(".overlay").addClass("showOverlay");
    $(".description").addClass("showOverlay");
    $("hr").addClass("showOverlay");
};

function hideOverlays() {
    $(".overlay").removeClass("showOverlay");
    $(".description").removeClass("showOverlay");
    $("hr").removeClass("showOverlay");
};