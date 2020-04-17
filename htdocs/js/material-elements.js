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

    let rippler = document.createElement("span");
    rippleContainer.appendChild(rippler);
    rippler.setAttribute("style", style);
    setTimeout(() => {
        rippleContainer.firstChild.remove();
    }, 600);
}

/**
 * Run this function once the body loads to initialize the ripple effect
 */
function initializeRipple() {
    "use strict";

    let ripples = document.querySelectorAll("[ripple]");
    for (let i = 0; i < ripples.length; i++) {
        let ripple = ripples[i];
        let rippleContainer = document.createElement("div");
        rippleContainer.setAttribute("class", "ripple-container");
        ripple.addEventListener("mousedown", (e) => {
            showRipple(e, ripple, rippleContainer);
        });
        ripple.appendChild(rippleContainer);
    }
}

function initializeTextInput() {
    "use strict";

    let textFields = document.querySelectorAll(".material-input-text");
    for (let i = 0; i < textFields.length; i++) {
        let textField = textFields[i].childNodes[1];
        let label = textFields[i].childNodes[4];
        let highlight = document.createElement("div");
        highlight.classList.add("input-text-highlight-blur");
        highlight.style.width = textField.getBoundingClientRect().width + "px";
        textFields[i].appendChild(highlight);
        textField.addEventListener("focus", () => {
            label.classList.add("material-text-label-up");
            label.classList.remove("material-text-label-down");
            let newHighlight = document.createElement("div");
            newHighlight.classList.add("input-text-highlight-focus");
            textFields[i].appendChild(newHighlight);
            let oldHighlight = highlight;
            highlight = newHighlight;
            setTimeout(() => {
                oldHighlight.remove();
            }, 300);
            highlight.style.width = textField.getBoundingClientRect().width + "px";
        });
        textField.addEventListener("blur", () => {
            if (textField.value === "") {
                label.classList.remove("material-text-label-up");
                label.classList.add("material-text-label-down");
            }
            highlight.classList.remove("input-text-highlight-focus");
            highlight.classList.add("input-text-highlight-blur");
        });
    }
}