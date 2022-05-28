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