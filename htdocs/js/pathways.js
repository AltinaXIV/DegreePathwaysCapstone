let enableCompactView = false;

const ClassType = {
    ROOT: 0,
    BRANCH: 1,
    LEAF: 2,
    STAND_ALONE: 3
};

let Info = class {
    constructor() {
        this.classes = {};
        this.prereqs = new Map();
        this.isPrereq = []; // Defines if a class is a prereq of another.
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
    bubble.id = course_no;
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
    bubble.id = course_no;
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
    bubble.id = course_no;
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
    bubble.id = course_no;
    elem.appendChild(document.createElement("br"));
}

/**
 * This algorithm assigns values to classes to show where they should be placed
 *
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
    if(info.valuesArray.has(maxDepth)) {
        let a = info.valuesArray.get(maxDepth);
        a = a.concat([courseID]);
        info.valuesArray.set(maxDepth, a);
    } else {
        info.valuesArray.set(maxDepth, [courseID]);
    }
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
        info.isPrereq.push(prereqs[i]['prereq']);
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

    for(let i = 0; i < info.classes.length; i++) {
        let d = calculateDepth(info.classes[i]['id'], info) + 1;
        info.minSemesters = Math.max(d, info.minSemesters);
    }

    return info;
}

function drawTable(cols) {
    let body = document.getElementById('main-body');
    body.innerHTML = '';
    let table = document.createElement("table");
    table.id = "pathway";

        let row = document.createElement("tr");
        for (let c = 1; c <= cols; c++) {
            let cell = document.createElement("td");
            cell.innerHTML = "Semester " + c;
            cell.id = "semester-" + c + "-label";
            row.appendChild(cell);
        }
        table.appendChild(row);
    body.appendChild(table);
}

function addRow(semesters) {
    let table = document.getElementById("pathway");
    let tr = document.createElement("tr");
    let currentRows = document.querySelectorAll("#pathway tr").length;
    for(let i = 0; i < semesters; i++) {
        let td = document.createElement("td");
        td.id= (currentRows - 1) + "_" + i;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

/**
 *
 * @param info {Info}
 * @param semesters {number}
 */
function place_dynamic(info, semesters) {
    let currentRows = document.querySelectorAll("#pathway tr").length - 1;
    let classesPerSemester = Math.floor(info.classes.length / semesters);
    let remainingClasses = info.classes.length % semesters;
    let placed = [];
    let lastInRow = [];
    let currentColCount = 0;
    let currentCol = 0;
    let allPrereqsPlaced = false;

    // TODO: Fix this inefficient algorithm
    // TODO: The created pathway should can be compressed vertically.
    while(placed.length < info.classes.length) {
        let t = info.prereqs.values();

        if(!allPrereqsPlaced){
            allPrereqsPlaced = true;
            for(let u = 0; u < info.prereqs.size; u++) {
                let val = t.next().value;
                for(let l = 0; l < val.length; l++) {
                    if(!placed.includes(val[l])) {
                        allPrereqsPlaced = false;
                        break;
                    }
                }
            }
        }
        for(let i = 0; i < info.classes.length; i++) {
            // Fix the col
            if(remainingClasses > 0) {
                if(currentColCount === classesPerSemester + 1) {
                    remainingClasses--;
                    currentColCount = 0;
                    currentCol++;
                }
            } else if(currentColCount === classesPerSemester) {
                currentColCount = 0;
                currentCol++
            }

            //Place the class
            if(!placed.includes(info.classes[i]['id'])) {
                let type;
                let currentClass = info.classes[i];
                /**
                 *
                 * @type {num[]}
                 */
                let preReqs = info.prereqs.get(currentClass['id']);

                // Figure out what type of node the current element is.

                if(preReqs === undefined && info.isPrereq.includes(currentClass['id'])) {
                    type = ClassType.ROOT;
                } else if(preReqs === undefined && !info.isPrereq.includes(currentClass['id'])) {
                    type = ClassType.STAND_ALONE;
                }
                else if(preReqs !== undefined && info.isPrereq.includes(currentClass['id'])) {
                    type = ClassType.BRANCH;
                } else {
                    type = ClassType.LEAF;
                }

                let isCoreqOfPrereq = false;
                let isPrereq = false;

                if(!allPrereqsPlaced) {

                    // Check if the current class is a prereq of another class
                    const allPrereqs = info.prereqs.values();
                    for(let z = 0; z < info.prereqs.size; z++) {
                        let p = allPrereqs.next().value;
                        for(let y = 0; y < p.length; y++) {
                            if(currentClass['id'] === p[y]) {
                                isPrereq = true;
                                break;
                            }
                        }
                        if(isPrereq) break;
                    }

                    // If the current class is not a prereq, check if it is a coreq of a prereq
                    if(!isPrereq) {
                        let allCoreqKeys = info.coreqs.keys();
                        let allCoreqValues = info.coreqs.values();
                        for(let z = 0; z < info.coreqs.size; z++) {
                            let k = allCoreqKeys.next().value;
                            let v = allCoreqValues.next().value;
                            for(let y = 0; y < v.length; v++) {
                                if(currentClass['id'] === v[y] && info.isPrereq.includes(k)) {
                                    isCoreqOfPrereq = true;
                                    break;
                                }
                            }
                            if(isCoreqOfPrereq) break;
                        }
                    }
                }

                if(!isCoreqOfPrereq && !allPrereqsPlaced && !isPrereq) {
                    continue;
                }

                if(type === ClassType.ROOT || type === ClassType.STAND_ALONE) {
                    // Make sure Coreqs are placed first!
                    let canPlace = true;
                    let coreqs = info.coreqs.get(currentClass['id']);
                    if(coreqs !== undefined) {
                        for(let j = 0; j < coreqs.length; j++) {
                            if(!placed.includes(coreqs[j])) {
                                canPlace = false;
                                break;
                            }
                        }
                    }

                    // If the coreqs were not placed, try placing the next class on the list.
                    if(!canPlace) {
                        continue;
                    }

                    currentRows++;
                    currentColCount++;
                    addRow(semesters);
                    if(type === ClassType.ROOT) {
                        addRootTo((currentRows - 1) + "_" + currentCol, currentClass['id'], currentClass['title']);
                    } else {
                        addStandAloneTo((currentRows - 1) + "_" + currentCol, currentClass['id'], currentClass['title']);
                    }
                    placed.push(currentClass['id']);
                    lastInRow.push(currentClass['id']);
                } else {

                    let canPlace = true;
                    let coreqs = info.coreqs.get(currentClass['id']);
                    if(coreqs !== undefined) {
                        for(let j = 0; j < coreqs.length; j++) {
                            if(!placed.includes(coreqs[j])) {
                                canPlace = false;
                                break;
                            }
                        }
                    }

                    if(!canPlace) {
                        continue;
                    }

                    let j = 0;
                    for(j = 0; j < lastInRow.length; j++) {
                        // noinspection JSObjectNullOrUndefined
                        if(preReqs.includes(lastInRow[j])) break;
                    }
                    if(type === ClassType.LEAF) {
                        addLeafTo(j + "_" + currentCol, currentClass['id'], currentClass['title'])
                    } else {
                        addBranchTo(j + "_" + currentCol, currentClass['id'], currentClass['title']);
                    }
                    setTimeout(() => {
                        attachElements(document.getElementById(lastInRow[j]), document.getElementById(currentClass['id']));
                        console.log("Connecting " + lastInRow[j] + " to " + currentClass['id']);
                    },200);
                    currentColCount++;
                    lastInRow[j] = currentClass['id'];
                    placed.push(currentClass['id']);
                }
            }
        }
    }
    console.log(placed);
}

/**
 * TODO: Remove this in final revision
 *
 * Generates the CS Minor in the degree pathway program algorithmically.
 * @returns {Promise<void>}
 */
async function demo() {
    let info = await getInfo();
    let semesters = parseInt(document.getElementById("semesters").value);
    if(isNaN(semesters) || semesters < info.minSemesters) {
        alert("Please enter a value greater than " + (info.minSemesters - 1) + " for this major.");
        return;
    } else if(semesters > info.classes.length) {
        alert("Too many semesters!!");
        return;
    }
    drawTable(semesters);
    place_dynamic(info, semesters);
}