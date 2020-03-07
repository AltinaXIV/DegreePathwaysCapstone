let enableCompactView = false;

/**
 * Switches all class bubbles in or out of the compact view depending on the status of the checkbox
 *
 * @param {HTMLInputElement} checkbox
 */
function switchCompact(checkbox) {
    let allBubbles = document.querySelectorAll("root-class-bubble, branch-class-bubble, leaf-class-bubble," +
        "stand-alone-class-bubble");
    if(checkbox.checked) {
        enableCompactView = true;
        allBubbles.forEach(bubble => {
           bubble.setAttribute("compact", "");
        });
    } else {
        enableCompactView = false;
        allBubbles.forEach(bubble => {
            bubble.removeAttribute("compact");
        });
    }
}