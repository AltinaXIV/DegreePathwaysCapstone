let enableCompactView = false;

let Info = class {
    constructor() {
        this.classes = {};
        this.prereqs = new Map();
        this.coreqs = new Map();
        this.minSemesters = 0;
        /**
         * @type {Map<number, number[]>} Maps a placement value to an array of class IDs.
         * The placement value shows where it needs to be placed on the pathway. Anything labeled 0 needs to be placed,
         * 1 second, etc.
         *
         * e.g. For the CS Minor:
         * 0 -> [220, 401, 441, 449]
         * 1 -> [445, 447]
         * 2 -> [1501]
         */
        this.valuesArray = new Map();
        /**
         * @type {Map<number, number>} Just like above but reversed
         *
         * e.g.
         * 220 -> 0
         * 401 -> 0
         * ...
         * 447 -> 1
         * 1501 -> 2
         */
        this.valuesArrayReverse = new Map();
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
 * @param courseID {number} course ID
 * @param info {Info} info
 */
function calculateDepth(courseID, info) {
    let maxDepth = 0;

    if(info.valuesArrayReverse.has(courseID)) {
        return info.valuesArrayReverse.get(courseID);
    }

    // Get the prereqs and iterate through them
    let prereqs = info.prereqs.get(courseID);
    if(prereqs !== undefined) {
        for(let i = 0; i < prereqs.length; i++) {
            let d = calculateDepth(prereqs[i], info) + 1;
            maxDepth = Math.max(maxDepth, d);
        }
    }

    // And now co-reqs...
    let coreqs = info.coreqs.get(courseID);
    if(coreqs !== undefined) {
        for(let i = 0; i < coreqs.length; i++) {
            let d = calculateDepth(coreqs[i], info);
            maxDepth = Math.max(maxDepth, d);
        }
    }

    info.valuesArrayReverse.set(courseID, maxDepth);
    return maxDepth;

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
    let prereqs;
    prereqs = await r.json();
    r = await fetch("/cdn/query.php?a=coreq");
    let coreqs;
    coreqs = await r.json();

    info.classes = info.classes['classes'];
    prereqs = prereqs['prereqs'];
    coreqs = coreqs['coreqs'];

    console.log(prereqs);

    // Calculate minimum number of semesters needed to finish.

    // Step 1: organize prereqs and coreqs into an map.
    for(let i = 0; i < prereqs.length; i++) {
        if(info.prereqs.get(prereqs[i]['course']) === undefined) {
            info.prereqs.set(prereqs[i]['course'], [prereqs[i]['prereq']]);
        } else {
            let v = info.prereqs.get(prereqs[i]['course']);
            info.prereqs.set(prereqs[i]['course'], v.concat([prereqs[i]['prereq']]))
        }
    }

    for(let i = 0; i < coreqs.length; i++) {
        if(info.coreqs.get(coreqs[i]['course']) === undefined) {
            info.coreqs.set(coreqs[i]['course'], [coreqs[i]['coreq']]);
        } else {
            let v = info.coreqs.get(coreqs[i]['course']);
            info.prereqs.set(coreqs[i]['course'], v.concat([coreqs[i]['coreq']]))
        }
    }

    // Step 2: Think of classes as a graph. For each class, find the quickest path to the Root.
    // Todo: This will re-evaluate values many times. Make this more efficient. gip20@pitt.edu

    for(let i = 0; i < info.classes.length; i++) {
        calculateDepth(info.classes[i]['id'], info)
    }

    return info;
}

async function demo() {
    let info = await getInfo();
    drawTable();
    //place();
}