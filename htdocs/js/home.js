initializeRipple();
initializeTextInput();

function activateLeftNav() {
    let topNav = document.getElementById("left-nav");
    let mainBody = document.getElementById("main-body");
    if (topNav.classList.contains("active")) {
        topNav.classList.remove("active");
        topNav.classList.add("inactive");
        mainBody.classList.remove("active");
        mainBody.classList.add("inactive");
    } else {
        topNav.classList.add("active");
        topNav.classList.remove("inactive");
        mainBody.classList.add("active");
        mainBody.classList.remove("inactive");
    }
}