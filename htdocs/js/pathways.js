let enableCompactView = false;

let Info = class {
    constructor() {
        this.classes = {};
        this.prereqs = {};
        this.coreqs = {};
        this.minSemesters = 0;
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



/**
 * Get information needed to map out course
 *
 * TODO: In full product, get courses required by some major id. This is currently only STATIC for the CS MINOR
 */
async function getInfo() {
    let info = new Info();
    let r = await fetch("/cdn/query.php?a=major");
    info.classes = await r.json();
    r = await fetch("/cdn/query.php?a=prereq");
    info.prereqs = await r.json();
    r = await fetch("/cdn/query.php?a=coreq");
    info.coreqs = await r.json();

    info.classes = info.classes['classes'];
    info.prereqs = info.prereqs['prereqs'];
    info.coreqs = info.coreqs['coreqs'];
    return info;
}

async function demo() {
    let info = await getInfo();
    console.log(info);
    drawTable();
    //place();
}