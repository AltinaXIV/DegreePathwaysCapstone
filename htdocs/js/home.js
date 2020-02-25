initializeRipple();

function activateLeftNav() {
    let topNav = document.getElementById("left-nav");
    if(topNav.classList.contains("active")) {
        topNav.classList.remove("active");
        topNav.classList.add("inactive");
    } else {
        topNav.classList.add("active");
        topNav.classList.remove("inactive");
    }
}