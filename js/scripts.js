// Main Page -- typing animation
var typed = new Typed('.typed', {
    stringsElement: '.typed-strings',
    typeSpeed: 35,
    startDelay: 750,
});


// 3D Art -- Show overlays when hovered/clicked
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

// Get Current Time/Date
document.getElementById("currentTimeAndDate").innerHTML = (Date().toLocaleString());


// Cookie Banner
function getCookieValue() {
    if (document.cookie.split(';').some((item) => item.includes('cookieStatus=accepted'))) {
        document.getElementById("cookieBanner").style.visibility = 'hidden';
    } else if (document.cookie.split(';').some((item) => item.includes('cookieStatus=denied'))) {
        document.getElementById("cookieBanner").style.visibility = 'hidden';
    } else {
        document.getElementById("cookieBanner").style.visibility = 'visible';
    }
}

function onloadFunction() {
    getCookieValue()
}

document.onload = onloadFunction();

function acceptCookies() {
    document.cookie = "cookieStatus=accepted; max-age=604800; path=/";
    document.getElementById("cookieBanner").style.visibility = 'hidden';
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'granted',
    });
}

function deniedCookies() {
    document.cookie = "cookieStatus=denied; max-age=604800; path=/";
    document.getElementById("cookieBanner").style.visibility = 'hidden';
}


// Light/Dark Mode Toggle
// the script assumes that the user has dark mode, and adapts to light mode
var isDark = new Boolean(true);

// checks whether dark mode is enabled
function isDarkModeEnabled() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark == true) {
        return true
    } else {
        return false
    }
}

function onloadFunction() {
    document.getElementById('themeToggle').innerHTML = "dark_mode"
    // sees whether os prefers dark or light mode
    if (isDarkModeEnabled()) {
        isDark = true;
    } else {
        isDark = false;
        document.getElementById('themeToggle').innerHTML = "light_mode"
    }
}

function toggleTheme() {
    isDark = !isDark // inverts the boolean because its the opposite now the
    // user selects the opposite
    if (isDark) {
        // it will change the icon and the variables to match user preferred theme
        document.getElementById('themeToggle').innerHTML = "dark_mode"
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#161616");
        document.querySelector(':root').style.setProperty('--bg', 'var(--dark-bg)');
        document.querySelector(':root').style.setProperty('--text', 'var(--dark-text)');
        document.getElementById('body').style.fontWeight = '300';
    } else {
        // same here, but with light mode
        document.getElementById('themeToggle').innerHTML = "light_mode"
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#e5e9f0");
        document.querySelector(':root').style.setProperty('--bg', 'var(--light-bg)');
        document.querySelector(':root').style.setProperty('--text', 'var(--light-text)');
        document.getElementById('body').style.fontWeight = '400';
    }
}