function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setDarkTheme() {
    setCookie('theme', 'dark');
    toggle_theme_div.classList.add('dark');
    toggle_theme_div.classList.remove('light');
    const p_color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    const s_color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
    document.documentElement.style.setProperty('--primary-color', s_color);
    document.documentElement.style.setProperty('--secondary-color', p_color);
    document.getElementById('github').src = './img/github.svg';
}

function setLightTheme() {
    setCookie('theme', 'light');
    toggle_theme_div.classList.add('light');
    toggle_theme_div.classList.remove('dark');
    const p_color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    const s_color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
    document.documentElement.style.setProperty('--primary-color', s_color);
    document.documentElement.style.setProperty('--secondary-color', p_color);
    document.getElementById('github').src = './img/github_black.svg';
}

window.onload = () => {
    nav_btn = document.getElementById('nav_btn');
    nav = document.getElementsByTagName('nav')[0];
    nav_btn.onclick = () => {
        if (nav_btn.classList.contains('nav_btn_clicked')) {
            nav_btn.classList.remove('nav_btn_clicked');
            nav.classList.remove('nav_open');
        } else {
            nav_btn.classList.add('nav_btn_clicked');
            nav.classList.add('nav_open');
        }
    }
    toggle_theme_div = document.getElementById('toggle_theme');
    if (getCookie('theme') == 'dark') {
        setDarkTheme();
    }
    toggle_theme_div.onclick = () => {
        if (toggle_theme_div.classList.contains('light')) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }
    for (img of document.getElementsByTagName('img')) {
        img.ondrag = (e) => {
            e.preventDefault();
        }
    }
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
};


$(document).ready(function() {
    $(".hamburger-lines").click(() => {
        $(".checkbtn").toggleClass("open");
        $("body").toggleClass("fixed_position");
    });

    // Cerrar menu al pulsar enlace
    $(".menu a").click(() => {
        $(".checkbtn").removeClass("open");
        $("body").removeClass("fixed_position");
    });

});

$(window).scroll(function() {
    skills = ['js', 'html', 'css', 'react', 'vue', 'bootstrap', 'php', 'python', 'mysql', 'laravel', 'django', 'node_js'];
    for (let i = 0; i < skills.length; i++) {
        if (isScrolledIntoView($('#' + skills[i]))) {
            $('#' + skills[i]).addClass('progress_bar_' + skills[i]);
        } else {
            $('#' + skills[i]).removeClass('progress_bar_' + skills[i]);
        }
    }
});