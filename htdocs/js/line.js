
/**
 * Tells the client to connect a line from firstElement to secondElement every time that element moves.
 *
 * @param firstElement {HTMLElement}
 * @param secondElement {HTMLElement}
 */
function attachElements(firstElement, secondElement) {
    "use strict";

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

        //First, create a curve that points the line in the proper y direction towards e2
        let currentPositionX = e1.getBoundingClientRect().right;
        let e1y = e1.getBoundingClientRect().bottom - ((e1.getBoundingClientRect().bottom - e1.getBoundingClientRect().top) / 2);
        let e2y = e2.getBoundingClientRect().bottom - (e2.getBoundingClientRect().bottom - e2.getBoundingClientRect().top) / 2;
        svg.setAttribute("height", window.innerHeight.toString());
        let width = (e2.getBoundingClientRect().left - e1.getBoundingClientRect().right).toString();
        svg.setAttribute("width", width.toString());
        let currentPositionY = e1y;
        svg.style.left = e1.getBoundingClientRect().right + "px";
        svg.style.top = (e1.getBoundingClientRect().top + pageYOffset) + "px";
        if(e1y === e2y) {
            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", "0");
            line.setAttribute("x2", width.toString());
            line.setAttribute("y2", "0");

            svg.appendChild(line);
            document.querySelector("body").appendChild(svg);
        }
    };

    firstElement.addEventListener("move", drawLine(firstElement, secondElement, canvas));
    secondElement.addEventListener("move", drawLine(firstElement, secondElement, canvas));
    drawLine(firstElement, secondElement, canvas);

    //create new SVG element to use for the Line

}

