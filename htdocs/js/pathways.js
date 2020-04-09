let enableCompactView = false;

let Info = class {
    constructor() {
        this.classes = undefined;
    };
};

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

// add a bubble to a given element (column) by id
// temporarily places the argument course_no into the course-number slot
// needs work and real data
function addRootTo(id, course_no, course_name) {
    let elem = document.getElementById(id);
    let bubble = document.createElement("root-class-bubble");
    if(enableCompactView) {
        bubble.setAttribute("compact" ,"");
    }
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    bubble.innerHTML+= '<div slot="course-name">' + course_name + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("br"));
}

function addBranchTo(id, course_no, course_name){
    let elem = document.getElementById(id);
    let bubble = document.createElement("branch-class-bubble");
    if(enableCompactView) {
        bubble.setAttribute("compact" ,"");
    }
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    bubble.innerHTML+= '<div slot="course-name">' + course_name + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("br"));
}

function addLeafTo(id, course_no, course_name){
    let elem = document.getElementById(id);
    let bubble = document.createElement("leaf-class-bubble");
    if(enableCompactView) {
        bubble.setAttribute("compact" ,"");
    }
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    bubble.innerHTML+= '<div slot="course-name">' + course_name + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("br"));
}

function addStandAloneTo(id, course_no, course_name){
    let elem = document.getElementById(id);
    let bubble = document.createElement("stand-alone-class-bubble");
    if(enableCompactView) {
        bubble.setAttribute("compact" ,"");
    }
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    bubble.innerHTML+= '<div slot="course-name">' + course_name + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("br"));
}

async function getClasses() {
    const r = await fetch("/cdn/query.php?action=major");
    return await r.json();
}

/**
 * Get information needed to map out course
 *
 * TODO: In full product, get courses required by some major id. This is currently only STATIC for the CS MINOR
 */
async function getInfo() {
    let info = new Info();
    info.classes = await getClasses();
    console.log(info);
    return null;
}

function demo() {
    let info = getInfo();
    drawTable();
    place();
}