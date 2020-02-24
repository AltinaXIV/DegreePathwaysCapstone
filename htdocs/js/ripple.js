/**
 * Shows ripple effect when element is clicked on
 *
 * @param event {MouseEvent} the click event
 * @param ripple {HTMLElement} the element that will have the ripple effect
 * @param rippleContainer {HTMLElement} the child that contains the ripple
 */
function showRipple(event, ripple, rippleContainer) {
    "use strict";

    let size = ripple.offsetWidth;
    let pos = ripple.getBoundingClientRect();
    let x = event.clientX - pos.left - size / 2;
    let y = event.clientY - pos.top - size / 2;
    let style = "top: " + y + "px; " +
        "left: " + x + "px; " +
        "height: " + size + "px; " +
        "width: " + size + "px;";

    console.log(style);
    let rippler = document.createElement("span");
    rippleContainer.appendChild(rippler);
    rippler.setAttribute("style", style);
    setTimeout(() => {rippleContainer.firstChild.remove();}, 600);
}

function initializeRipple() {
    "use strict";

    let ripples = document.querySelectorAll("[ripple]");
    for(let i = 0; i < ripples.length; i++) {
        let ripple = ripples[i];
        let rippleContainer = document.createElement("div");
        rippleContainer.setAttribute("class", "ripple-container");
        ripple.addEventListener("mousedown", e => {
            showRipple(e, ripple, rippleContainer);
        });
        ripple.appendChild(rippleContainer);
    }
}