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

document.getElementById("currentTimeAndDate").innerHTML = (Date().toLocaleString());

function getCookieValue() {
    if (document.cookie.split(';').some((item) => item.includes('cookieStatus=accepted'))) {
        document.getElementById("cookieBanner").style.visibility = 'hidden';
    }
    else if (document.cookie.split(';').some((item) => item.includes('cookieStatus=denied'))) {
        document.getElementById("cookieBanner").style.visibility = 'hidden';
    }
    else {
        document.getElementById("cookieBanner").style.visibility = 'visible';
    }
}

function onloadFunction() {
    getCookieValue()
}

window.onload = onloadFunction();

function acceptCookies() {
    document.cookie = "cookieStatus=accepted; max-age=604800";
    document.getElementById("cookieBanner").style.visibility = 'hidden';
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'granted',
    });
}

function deniedCookies() {
    document.cookie = "cookieStatus=denied; max-age=604800";
    document.getElementById("cookieBanner").style.visibility = 'hidden';
}