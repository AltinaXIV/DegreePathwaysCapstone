let draws = [];

// TODO: Fix bug where line has jank when elements being connected are too close to the same Y level

/**
 * Create a new SVGLineElement
 * @returns {SVGLineElement}
 */
function createLine() {
    return document.createElementNS("http://www.w3.org/2000/svg", "line");
}

/**
 * Creates an SVG path curve that goes right and up.
 *
 * @param x1 {number}
 * @param y1 {number}
 * @param dif {number}
 */
function createRightUpCurve(x1, y1, dif) {
    let sp = " ";
    let curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "M " + x1.toString() + sp + y1.toString() +
        " Q " + (x1 + 5).toString() + sp + (y1).toString() + sp +
        (x1 + 5).toString() + sp + (y1 - Math.min(dif / 2, 20)).toString();
    curve.setAttribute("d", d);
    return curve;
}

/**
 * Creates an SVG path curve that goes right and down.
 *
 * @param x1 {number}
 * @param y1 {number}
 * @param dif {number}
 */
function createRightDownCurve(x1, y1, dif) {
    let sp = " ";
    let curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "M " + x1.toString() + sp + y1.toString() +
        " Q " + (x1 + 5).toString() + sp + (y1).toString() + sp +
        (x1 + 5).toString() + sp + (y1 + Math.min(dif / 2, 20)).toString();
    curve.setAttribute("d", d);
    return curve;
}

/**
 * Creates an SVG path curve that goes up and right.
 *
 * @param x1 {number}
 * @param y1 {number}
 */
function createUpRightCurve(x1, y1) {
    let sp = " ";
    let curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "M " + x1.toString() + sp + y1.toString() +
        " Q " + (x1).toString() + sp + (y1 - 5).toString() + sp +
        (x1 + 20).toString() + sp + (y1 - 5).toString();
    curve.setAttribute("d", d);
    return curve;
}

/**
 * Creates an SVG path curve that goes down and right.
 *
 * @param x1 {number}
 * @param y1 {number}
 * @param finalY {number} the final position of y.
 */
function createDownRightCurve(x1, y1, finalY) {
    let sp = " ";
    let curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "M " + x1.toString() + sp + y1.toString() +
        " Q " + (x1).toString() + sp + (y1 + 5).toString() + sp +
        (x1 + 20).toString() + sp + (y1 + finalY).toString();
    curve.setAttribute("d", d);
    return curve;
}

/**
 * Draws an SVG Line from {x1, y1} to {x2, y2}
 *
 * @param line {SVGLineElement} SVG line to modify
 * @param x1 {number} starting x coordinate
 * @param y1 {number} starting y coordinate
 * @param x2 {number} final x coordinate
 * @param y2 {number} final y coordinate
 * @returns {SVGLineElement}
 */
function setLine(line, x1, y1, x2, y2) {
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    return line;
}

/**
 * Tells the client to connect a line from firstElement to secondElement every time that element moves.
 *
 * @param firstElement {HTMLElement}
 * @param secondElement {HTMLElement}
 */
function attachElements(firstElement, secondElement) {
    "use strict";

    if (firstElement === secondElement) {
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
    let drawLine = function (e1, e2, svg) {
        //TODO: Comments suck here. Fix this

        // Clear SVG if it is already drawn on.
        if (svg.innerHTML !== "") {
            svg.innerHTML = "";
        }

        // make e1 the leftmost element.
        // TODO: Function may be buggy if elements are too close to each other. fix.
        if (e1.getBoundingClientRect().right > e2.getBoundingClientRect().left) {
            let tmp = e1;
            e1 = e2;
            e2 = tmp;
        }

        //First, create a curve that points the line in the proper y direction towards e2
        let e1y = e1.getBoundingClientRect().bottom - ((e1.getBoundingClientRect().bottom - e1.getBoundingClientRect().top) / 2);
        let e2y = e2.getBoundingClientRect().bottom - (e2.getBoundingClientRect().bottom - e2.getBoundingClientRect().top) / 2;
        let height = (Math.abs(e1y - e2y));
        svg.setAttribute("height", (height + 2).toString());
        let width = e2.getBoundingClientRect().left - e1.getBoundingClientRect().right;
        if (width < 0) {
            width = 0;
        }
        svg.setAttribute("width", width.toString());
        let currentPositionY = 1;
        let currentPositionX = 0;
        svg.style.left = e1.getBoundingClientRect().right + "px";
        svg.style.top = Math.min(e1y, e2y) - 1 + "px";
        let heightDif = Math.abs(e1y - e2y);
        if (e1y === e2y) {
            let line = createLine();
            line = setLine(line, 0, 1, width, 1);
            svg.appendChild(line);
        } else if (e1y < e2y) {
            // Second element is lower than first

            let line = createLine();
            line = setLine(line, currentPositionX, currentPositionY, currentPositionX + 20, currentPositionY);
            svg.appendChild(line);
            currentPositionX += 20;
            let curve = createRightDownCurve(currentPositionX, currentPositionY, heightDif);
            svg.appendChild(curve);
            currentPositionX += 5;
            currentPositionY += Math.min(heightDif / 2, 20);
            if (height - currentPositionY > 6) {
                line = createLine();
                line = setLine(line, currentPositionX, currentPositionY, currentPositionX, height - 6);
                currentPositionY = height - 6;
                svg.appendChild(line);
            }
            curve = createDownRightCurve(currentPositionX, currentPositionY, Math.min(5, height - currentPositionY));
            currentPositionX += 20;
            currentPositionY += Math.min(5, height - currentPositionY);
            svg.appendChild(curve);
            line = createLine();
            line = setLine(line, currentPositionX, currentPositionY, width, currentPositionY);
            svg.appendChild(line);
        } else {
            // Second element is higher than first

            currentPositionY = height;
            let line = createLine();
            line = setLine(line, currentPositionX, currentPositionY, currentPositionX + 20, currentPositionY);
            svg.appendChild(line);
            currentPositionX += 20;
            let curve = createRightUpCurve(currentPositionX, currentPositionY, heightDif);
            svg.appendChild(curve);
            currentPositionX += 5;
            currentPositionY -= Math.min(heightDif / 2, 20);
            currentPositionY = Math.max(currentPositionY, 6);
            if (currentPositionY > 6) {
                line = createLine();
                line = setLine(line, currentPositionX, currentPositionY, currentPositionX, 6);
                currentPositionY = 6;
                svg.appendChild(line);
            }
            curve = createUpRightCurve(currentPositionX, currentPositionY);
            currentPositionX += 20;
            currentPositionY -= 5;
            svg.appendChild(curve);
            line = createLine();
            line = setLine(line, currentPositionX, currentPositionY, width, currentPositionY);
            svg.appendChild(line);
        }
        document.querySelector("body").appendChild(svg);
    };


    for (let i = 0; i < draws.length; i++) {
        if ((draws[i][0] === firstElement || draws[i][0] === secondElement) &&
            (draws[i][1] === firstElement || draws[i][1] === secondElement)) {
            drawLine(firstElement, secondElement, draws[i][2]);
            return;
        }
    }
    draws.push([firstElement, secondElement, canvas]);
    drawLine(firstElement, secondElement, canvas);
    window.addEventListener("resize", () => drawLine(firstElement, secondElement, canvas));
}