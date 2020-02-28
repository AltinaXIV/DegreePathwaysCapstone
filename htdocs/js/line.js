let draws = [];

/**
 * Tells the client to connect a line from firstElement to secondElement every time that element moves.
 *
 * @param firstElement {HTMLElement}
 * @param secondElement {HTMLElement}
 */
function attachElements(firstElement, secondElement) {
    "use strict";

    if(firstElement === secondElement) {
        return;
    }

    let canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    /**
     * Draws the line
     *
     * @param e1 {HTMLElement} first element
     * @param e2 {HTMLElement} second element
     * @param svg {SVGSVGElement} image element
     */
    let drawLine = function(e1, e2, svg) {
        //TODO: Comments suck here. Fix this

        // Clear SVG if it is already drawn on.
        if(svg.innerHTML !== "") {
            svg.innerHTML = "";
        }

        // make e1 the leftmost element
        if(e1.getBoundingClientRect().right > e2.getBoundingClientRect().left) {
            let tmp = e1;
            e1 = e2;
            e2 = tmp;
        }

        //First, create a curve that points the line in the proper y direction towards e2
        let currentPositionX = e1.getBoundingClientRect().right;
        let e1y = e1.getBoundingClientRect().bottom - ((e1.getBoundingClientRect().bottom - e1.getBoundingClientRect().top) / 2);
        let e2y = e2.getBoundingClientRect().bottom - (e2.getBoundingClientRect().bottom - e2.getBoundingClientRect().top) / 2;
        svg.setAttribute("height", (Math.abs(e1y - e2y) + 4).toString());
        let width = (e2.getBoundingClientRect().left - e1.getBoundingClientRect().right).toString();
        if(width < 0) {
            width = 0;
        }
        svg.setAttribute("width", width.toString());
        let currentPositionY = e1y;
        svg.style.left = e1.getBoundingClientRect().right + "px";
        svg.style.top = Math.max(e1y, e2y) + "px";
        if(e1y === e2y) {
            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", "0");
            line.setAttribute("x2", width.toString());
            line.setAttribute("y2", "0");

            svg.appendChild(line);
            document.querySelector("body").appendChild(svg);
        }
        console.log("line drawn");
    };


    for(let i = 0; i < draws.length; i++) {
        if((draws[i][0] === firstElement || draws[i][0] === secondElement) && (draws[i][1] === firstElement || draws[i][1] === secondElement)) {
            drawLine(firstElement, secondElement, draws[i][2]);
            return;
        }
    }
    draws.push([firstElement, secondElement, canvas]);
    drawLine(firstElement, secondElement, canvas);
    window.addEventListener("resize", () => drawLine(firstElement, secondElement, canvas));
}