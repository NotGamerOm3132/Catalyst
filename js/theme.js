/*==================================================
                    THEME.JS
==================================================*/

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const themeIcon = document.getElementById("theme-icon-path");

/*==================================
            SVG PATHS
==================================*/

const moonPath =
"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";

const sunPath =
"M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93M12 8A4 4 0 1 1 12 16A4 4 0 0 1 12 8Z";

/*==================================
            SET THEME
==================================*/

function setTheme(theme){

    root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

    updateThemeIcon(theme);

}

/*==================================
            UPDATE ICON
==================================*/

function updateThemeIcon(theme){

    if(!themeIcon) return;

    if(theme === "dark"){

        themeIcon.setAttribute("d", moonPath);

    }

    else{

        themeIcon.setAttribute("d", sunPath);

    }

}

/*==================================
            TOGGLE
==================================*/

function toggleTheme(){

    const currentTheme =
        root.getAttribute("data-theme") || "dark";

    const newTheme =
        currentTheme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);

    themeIcon.animate(

    [

        {

            transform:"rotate(0deg) scale(1)"

        },

        {

            transform:"rotate(180deg) scale(.8)"

        },

        {

            transform:"rotate(360deg) scale(1)"

        }

    ],

    {

        duration:500,

        easing:"ease-in-out"

    }

);

}

function initTheme(){

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme){

        setTheme(savedTheme);

    }

    else{

        setTheme("dark");

    }

}

/*==================================
            EVENTS
==================================*/

if(themeToggle){

    themeToggle.addEventListener("click", toggleTheme);

}

document.addEventListener("DOMContentLoaded", initTheme);