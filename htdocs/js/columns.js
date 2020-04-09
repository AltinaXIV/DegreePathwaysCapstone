/**
 * add a bubble to a given element (column) by id
 * temporarily places the argument course_no into the course-number slot
 * needs work and real data
 */
function addRootTo(id, course_no, course_name){
    var elem = document.getElementById(id, course_no);
    var bubble = document.createElement("root-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    bubble.innerHTML+= '<div slot="course-name">' + course_name + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addBranchTo(id, course_no, course_name){
    var elem = document.getElementById(id, course_no);
    var bubble = document.createElement("branch-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    bubble.innerHTML+= '<div slot="course-name">' + course_name + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addLeafTo(id, course_no, course_name){
    var elem = document.getElementById(id, course_no);
    var bubble = document.createElement("leaf-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    bubble.innerHTML+= '<div slot="course-name">' + course_name + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addStandAloneTo(id, course_no, course_name){
    var elem = document.getElementById(id, course_no);
    var bubble = document.createElement("stand-alone-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    bubble.innerHTML+= '<div slot="course-name">' + course_name + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

// just a test function to place sample data
function place(){
    addRootTo("r1-c1", "MATH", "course name");
    addBranchTo("r1-c2", "CS441", "course name");
    addBranchTo("r3-c2", "CS445", "course name");
    addLeafTo("r2-c3", "CS1501", "course name");
    addRootTo("r3-c1","CS401", "course name");
    addLeafTo("r3-c3", "CS449", "course name");
    addLeafTo("r4-c2", "CS447", "course name");
}

function drawTable() {
    var rows = 10; //specify as 10 for now
    var columns = parseInt(document.getElementById("semesters").value);
    
    var body = document.getElementById('main-body');
    body.innerHTML='';
    var table = document.createElement("table");
    table.id = "pathway";

    for (var r = 0; r <= rows; r++) {
        var row = document.createElement("tr");
        for (var c = 1; c <= columns; c++) {
            var cell = document.createElement("td");
            if (r == 0){
                cell.innerHTML ="Semester " + c;
                cell.id = "semester-" + c + "-label";
            }
            else {
                cell.id= "r" + r + "-c" + c;
                // cell.innerHTML = "r" + r + "-c" + c;
            }
            row.appendChild(cell);
        }           
    table.appendChild(row);
    }
    body.appendChild(table);
    
}

/**
 * Connects course bubbles given a list of pairs of courses that have a prerequisite relation.
 * (using static data)
 */
function connect(){

    var preReqs = [["MATH", "CS441"],
    ["CS401", "CS445"],
    ["CS445", "CS449"],
    ["CS441", "CS1501"],
    ["CS445", "CS1501"]
    ];

    clearLines();
    var i;
    for (i = 0; i < preReqs.length; i++) {
        var firstElement = document.getElementById(preReqs[i][0]);
        var secondElement = document.getElementById(preReqs[i][1]);
        attachElements(firstElement, secondElement);  
    }
}

/**
 * Clears all existing lines between courses by removing all svg elements.
 */
function clearLines(){
    var lines = document.querySelectorAll('svg');

    var i;
    for (i = 0; i < lines.length; i++) {
       lines[i].remove();
    }
}

function demo(){
    drawTable();
    place();
    connect();
}

